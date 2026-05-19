const express = require("express")
const path = require("path")
const session = require("express-session")

const productosRoute = require("./routes/productRoute")
const carritoRoute = require("./routes/carritoRoute")
const controladorUsuario = require("./Data/ControladorUsuario")
const { Carrito, listaCarritos } = require("./Data/Carrito")

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: "ecommerceExpressWeb1",
  resave: false,
  saveUninitialized: false
}))

controladorUsuario.agregarUsuario("Enzo", "Llanos", "enzollanos16@gmail.com", "1234")

function obtenerCarritoUsuario(req) {
  let carrito = listaCarritos.find(c => c.idUsuario == req.session.usuario.id)

  if (!carrito) {
    carrito = new Carrito(req.session.usuario.id)
    listaCarritos.push(carrito)
  }

  return carrito
}

app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario
  next()
})

app.use((req, res, next) => {
  if (!req.session.usuario) {
    res.locals.cantidadCarrito = 0
    return next()
  }

  const carrito = obtenerCarritoUsuario(req)
  res.locals.cantidadCarrito = carrito.productos.reduce((total, p) => total + p.cantidad, 0)

  next()
})

app.get("/", (req, res) => {
  res.render("Login")
})

app.get("/Registrarse", (req, res) => {
  res.render("Registrar")
})

app.post("/registro", (req, res) => {
  const { nombre, apellido, email, password } = req.body

  controladorUsuario.agregarUsuario(nombre, apellido, email, password)

  const usuario = controladorUsuario.validarUsuario(email, password)
  const nuevoCarrito = new Carrito(usuario.id)

  listaCarritos.push(nuevoCarrito)
  req.session.usuario = usuario

  res.redirect("/inicio")
})

app.post("/ValidarUsuario", (req, res) => {
  const { email, password } = req.body
  const usuario = controladorUsuario.validarUsuario(email, password)

  if (!usuario) {
    return res.redirect("/")
  }

  req.session.usuario = usuario
  res.redirect("/inicio")
})

app.get("/Usuario", (req, res) => {
  res.render("Usuario")
})



app.use(productosRoute)
app.use(carritoRoute)

app.get("/sacar-carrito/:id", (req, res) => {
  if (!req.session.usuario) {
    return res.redirect("/")
  }

  const carrito = obtenerCarritoUsuario(req)
  const idp = req.params.id
  const index = carrito.productos.findIndex(p => p.idP == idp)

  if (index !== -1) {
    carrito.productos.splice(index, 1)
  }

  res.redirect("/Carrito")
})

app.use((req, res) => {
  res.status(404).send("Error 404 - Pagina no encontrada")
})

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000/")
})