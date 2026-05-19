const express = require("express")
const path = require("path")
const session = require("express-session")
const expressLayouts = require("express-ejs-layouts")

const productosRoute = require("./routes/productRoute")
const carritoRoute = require("./routes/carritoRoute")
const usuarioRoute = require("./routes/usuarioRoute")
const carritoController = require("./controller/CarritoController")

const controladorUsuario = require("./Data/ControladorUsuario")
const { Carrito, listaCarritos } = require("./Data/Carrito")

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(expressLayouts)
app.set("layout", "layouts/main")

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: "ecommerceExpressWeb1",
  resave: false,
  saveUninitialized: false
}))

app.use(productosRoute)
app.use(carritoRoute)
app.use(usuarioRoute)


app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario
  next()
})


app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000/")
})

app.use((req, res) => {
  res.status(404).send("Error 404 - Pagina no encontrada")
})
