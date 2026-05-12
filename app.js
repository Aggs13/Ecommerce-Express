const express = require("express")
const path = require("path")
const app = express()
const session = require("express-session");

app.set("view engine", "ejs")
// Carpeta de views
app.set("views", path.join(__dirname, "views"));
// Carpeta de public para Stylos o Imagenes
app.use(express.static(path.join(__dirname, "public")))
// Productos
const productos = require("./Data/Productos")
// Carrito
const {Carrito, listaCarritos} = require("./Data/Carrito") 
console.log(__dirname);

app.listen(3000,()=>
  console.log("Servidor en http://localhost:3000/")
)

//registrar usuario
const controladorUsuario = require("./Data/ControladorUsuario")
const UsuarioA = controladorUsuario.agregarUsuario("Enzo", "Llanos", "enzollanos16@gmail.com", "1234")

app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: "ecommerceExpressWeb1",
    resave: false,
    saveUninitialized: false
}));


app.post("/registro", (req,res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body)

  controladorUsuario.agregarUsuario(nombre, apellido, email, password);

  const usuario = controladorUsuario.validarUsuario(email, password);
  const nuevoCarrito = new Carrito(usuario.id);
  listaCarritos.push(nuevoCarrito);
  req.session.usuario = usuario;

  res.redirect("/inicio");
})


//validar usuario
app.post("/ValidarUsuario", (req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body)
  const usuario = controladorUsuario.validarUsuario(email, password);

  if (usuario) {
    req.session.usuario = usuario;
    res.redirect("/inicio");
  } else {
    res.redirect("/");
  }
})

//Pasar nombre de usuario al header
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario;
  next();
});

function obtenerCarritoUsuario(req) {
   let carrito = listaCarritos.find(c => c.idUsuario == req.session.usuario.id);
  if(!carrito){
    carrito = new Carrito(req.session.usuario.id);
    listaCarritos.push(carrito);
  }
  return carrito;
}

// Rutas  
app.get("/", (req,res) => {
  res.render("pages/Login.ejs")
})

app.get("/Usuario",(req,res) => {
  res.render("pages/Usuario")
})

app.use((req, res, next) => {
   if(!req.session.usuario){
    res.locals.cantidadCarrito = 0;
    return next();
  }

  const carrito = obtenerCarritoUsuario(req);

  let cantidadCarrito = 0;

  carrito.productos.forEach(p => {
    cantidadCarrito += p.cantidad;
  });

  res.locals.cantidadCarrito = cantidadCarrito;

  next();
});

app.get("/Registrarse",(req,res) => {
  res.render("pages/Registrar")
})

app.get("/Detalles/:id",(req,res) => {
  const id = req.params.id
  const producto = productos.find(p => p.id == id)
  res.render("pages/Detalle", {producto})
})

app.get("/inicio", (req, res)=>{
  const numeros = [...Array(productos.length).keys()].sort(() => Math.random() - 0.5).slice(0,4)

  console.log(numeros)
  res.render("pages/Inicio",{productos,numeros})
})



app.get("/inicio", (req, res)=>{
  res.render("pages/Inicio")
})




// Ruta para agregar al carrito
app.get("/agregar-carrito/:id",(req,res)=>{
   const carrito = obtenerCarritoUsuario(req);

  const idp = req.params.id;

  const producto = productos.find(p => p.id == idp);

  const existe = carrito.productos.find(p => p.id == idp);

  if(existe){

    existe.cantidad +=1;

  }else{

    carrito.productos.push({
      id : idp,
      nombre : producto.nombre,
      precio : producto.precio,
      img : producto.linkImg,
      cantidad : 1
    });

  }

  res.redirect("/Detalles/" + idp);
})

// Ruta para eliminar del carrito
app.get("/eliminar-carrito/:id",(req,res)=>{
   const carrito = obtenerCarritoUsuario(req);
  const idp = req.params.id
  const index = carrito.productos.findIndex(p => p.id == idp)
  if ( index !==-1) {
        carrito.productos[index].cantidad--;
      if(carrito.productos[index].cantidad <= 0){
        carrito.productos.splice(index,1)
      }
    }
  console.log(carrito)
  res.redirect("/Carrito")
})
//Suamr Carrito
app.get("/sumar-carrito/:id",(req,res)=>{
  const carrito = obtenerCarritoUsuario(req);
  const idp = req.params.id
  const producto = productos.find(p => p.id == idp)
  const existe = carrito.productos.find(p => p.id == idp)
  if(existe){
    existe.cantidad +=1;
  }else{
    const p =  {
      id : idp,
      nombre : producto.nombre,
      precio : producto.precio,
      img : producto.linkImg,
      cantidad : 1
    }
   carrito.productos.push(p)
  }
  console.log(carrito)
  res.redirect("/Carrito")
})

// sacar del carrito
  app.get("/sacar-carrito/:id",(req,res)=>{
    const carrito = obtenerCarritoUsuario(req);
    const idp = req.params.id;
    const index = carrito.productos.findIndex(p => p.id == idp);
    if (index !== -1) {
        carrito.productos.splice(index, 1);
    }
    console.log(carrito.productos);
    res.redirect("/Carrito");

  })


//calcular total
app.get("/Carrito",(req,res)=>{

  const carrito = obtenerCarritoUsuario(req);

  let total = 0;

  carrito.productos.forEach(p=> {
    total += p.precio * p.cantidad
  });

  res.render("pages/Carrito",{
    carrito : carrito.productos,
    total
  });

});

app.use((req, res) => {
    res.status(404).send("Error 404 - Página no encontrada");
});