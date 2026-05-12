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
