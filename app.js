const express = require("express")
const path = require("path")
const app = express()
const productRoutes = require("./routes/productRoute")
const carritoRoutes = require("./routes/carritoRoute")

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


app.use(productRoutes)
app.use(carritoRoutes)

// Rutas Auth 
app.get("/", (req,res) => {
  res.render("Login")
})


app.get("/Registrarse",(req,res) => {
  res.render("Registrar")
})


// Rutas carrito
// Ruta para agregar al carrito





//Suamar Carrito
//calcular total


/*
app.get("/inicio", (req, res)=>{
  const numeros = [...Array(productos.length).keys()].sort(() => Math.random() - 0.5).slice(0,4)
  
  console.log(numeros)
  res.render("Inicio",{productos,numeros})
})


app.get("/Detalles/:id",(req,res) => {
  const id = req.params.id
  const producto = productos.find(p => p.id == id)
  res.render("Detalle", {producto})
})



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


app.get("/Carrito",(req,res)=>{
  let total = 0;
  carrito.forEach(p=> {
    total += p.precio * p.cantidad
  })
  
  res.render("Carrito",{carrito,total})
})


*/