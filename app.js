const express = require("express")
const path = require("path")
const app = express()


app.set("view engine", "ejs")
// Carpeta de views
app.set("views", path.join(__dirname, "views"));
// Carpeta de public para Stylos o Imagenes
app.use(express.static(path.join(__dirname, "public")))
// Productos
const productos = require("./Data/Productos")
// Carrito
const carrito = require("./Data/Carrito") 
console.log(__dirname);

app.listen(3000,()=>
  console.log("Servidor en http://localhost:3000/")
)

//registrar usuario
const controladorUsuario = require("./Data/ControladorUsuario")

app.use(express.urlencoded({extended:true}))

app.post("/registro", (req,res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body)

  controladorUsuario.agregarUsuario(nombre, apellido, email, password);
  res.redirect("/inicio");
})




// Rutas  
app.get("/", (req,res) => {
  res.render("pages/Login.ejs")
})

app.use((req, res, next) => {
  let cantidadCarrito = 0;
  carrito.forEach(p => {
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
  const idp = req.params.id
  const producto = productos.find(p => p.id == idp)
  const existe = carrito.find(p => p.id == idp)
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
    carrito.push(p)
  }
  console.log(carrito)
  res.redirect("/Detalles/" + idp)
})

// Ruta para eliminar del carrito
app.get("/eliminar-carrito/:id",(req,res)=>{
  const idp = req.params.id
  const index = carrito.findIndex(p => p.id == idp)
  if ( index !==-1) {
        carrito[index].cantidad--;
      if(carrito[index].cantidad <= 0){
        carrito.splice(index,1)
      }
    }
  console.log(carrito)
  res.redirect("/Carrito")
})
//Suamr Carrito
app.get("/sumar-carrito/:id",(req,res)=>{
  const idp = req.params.id
  const producto = productos.find(p => p.id == idp)
  const existe = carrito.find(p => p.id == idp)
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
    carrito.push(p)
  }
  console.log(carrito)
  res.redirect("/Carrito")
})

// sacar del carrito
  app.get("/sacar-carrito/:id",(req,res)=>{
    const idp = req.params.id;
    const index = carrito.findIndex(p => p.id == idp);
    if (index !== -1) {
        carrito.splice(index, 1);
    }
    console.log(carrito);
    res.redirect("/Carrito");

  })


//calcular total
app.get("/Carrito",(req,res)=>{
  let total = 0;
  carrito.forEach(p=> {
    total += p.precio * p.cantidad
  })

  res.render("pages/Carrito",{carrito,total})
})

app.use((req, res) => {
    res.status(404).send("Error 404 - Página no encontrada");
});