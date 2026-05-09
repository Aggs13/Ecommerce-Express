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


// Rutas  
app.get("/", (req,res) => {
  res.render("pages/Login.ejs")
})

app.get("/Carrito",(req,res) => {
  res.render("pages/Carrito")
})

app.get("/Registrarse",(req,res) => {
  res.render("pages/Registrar")
})

app.get("/Detalles/:id",(req,res) => {
  const id = req.params.id
  const producto = productos.find(p => p.id == id)
  res.render("pages/Detalle", {producto})
})

app.get("/inicio", (req, res)=>{
  res.render("pages/Inicio",{productos,carrito})
})
app.get("/inicio", (req, res)=>{
  res.render("pages/Inicio")
})



// Ruta para agregar al carrito
app.get("/agregar-carrito/:id",(req,res)=>{
  const idp = req.params.id
  const producto = productos.find(p => p.id == idp)
  const p =  {
    id : idp,
    nombre : producto.nombre,
    precio : producto.precio,
    img : producto.linkImg
  }
  carrito.push(p)
  console.log(p)
  res.redirect("/Detalles/" + idp)
})