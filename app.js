const express = require("express")
const path = require("path")
const app = express()
const session = require("express-session");
app.set("view engine", "ejs")
const productosRoute = require("./routes/productRoute")

// Carpeta de views
app.set("views", path.join(__dirname, "views"));

// Carpeta de public para Stylos o Imagenes
app.use(express.static(path.join(__dirname, "public")))

app.listen(3000,()=>
  console.log("Servidor en http://localhost:3000/")
)

app.use(productosRoute)

const {Carrito, listaCarritos} = require("./Data/Carrito") 
console.log(__dirname);

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



app.get("/Usuario",(req,res) => {
  res.render("Usuario")
})

app.use((req, res, next) => {
   if(!req.session.usuario){
    res.locals.cantidadCarrito = 0;
    return next();
  }

function obtenerCarritoUsuario(req) {
   let carrito = listaCarritos.find(c => c.idUsuario == req.session.usuario.id);
  if(!carrito){
    carrito = new Carrito(req.session.usuario.id);
    listaCarritos.push(carrito);
  }
  return carrito;
}

  const carrito = obtenerCarritoUsuario(req);

  let cantidadCarrito = 0;

  carrito.productos.forEach(p => {
    cantidadCarrito += p.cantidad;
  });

  res.locals.cantidadCarrito = cantidadCarrito;

  next();
});
// Rutas Auth 
app.get("/", (req,res) => {
  res.render("Login")
})

app.get("/Registrarse",(req,res) => {
  res.render("Registrar")
})

app.get("/inicio", (req, res)=>{
  const numeros = [...Array(productos.length).keys()].sort(() => Math.random() - 0.5).slice(0,4)

  console.log(numeros)
  res.render("Inicio",{productos,numeros})
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


app.use((req, res) => {
    res.status(404).send("Error 404 - Página no encontrada");
});
