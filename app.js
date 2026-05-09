const express = require("express")
const path = require("path")
const app = express()

app.set("view engine", "ejs")
// Carpeta de views
app.set("views", path.join(__dirname, "views"));
// Carpeta de public para Stylos o Imagenes
app.use(express.static(path.join(__dirname, "public")))

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

app.get("/inicio", (req, res)=>{
  res.render("pages/Inicio")
})
app.get("/inicio", (req, res)=>{
  res.render("pages/Inicio")
})