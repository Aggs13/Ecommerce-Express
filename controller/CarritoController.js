const carritoModel = require("../models/carritoModel")
const { Carrito, listaCarritos } = require("../Data/Carrito")

function validarSesion(req, res) {
  if (!req.session.usuario) {
    res.redirect("/")
    return false
  }

  return true
}

function obtenerCarritoUsuario(req) {
  let carrito = listaCarritos.find(c => c.idUsuario == req.session.usuario.id)

  if (!carrito) {
    carrito = new Carrito(req.session.usuario.id)
    listaCarritos.push(carrito)
  }

  return carrito
}

function ActualizarContadorCarrito(req, res, next) {
  if (!req.session.usuario) {
    res.locals.cantidadCarrito = 0
    return next()
  }

  const carrito = obtenerCarritoUsuario(req)
  res.locals.cantidadCarrito = carrito.productos.reduce((total, p) => total + p.cantidad, 0)

  next()
}

function AgregarCarro(req, res) {
  if (!validarSesion(req, res)) return

  const idp = req.params.id
  carritoModel.agregarProducto(req.session.usuario.id, idp)
  res.redirect("/Detalles/" + idp)
}

function SumarCarro(req, res) {
  if (!validarSesion(req, res)) return

  carritoModel.sumarProducto(req.session.usuario.id, req.params.id)
  res.redirect("/Carrito")
}

function RestarCarro(req, res) {
  if (!validarSesion(req, res)) return

  carritoModel.restarProducto(req.session.usuario.id, req.params.id)
  res.redirect("/Carrito")
}

function sacarCarrito(req, res) {
  if (!validarSesion(req, res)) return

  const carrito = obtenerCarritoUsuario(req)
  const idp = req.params.id
  const index = carrito.productos.findIndex(p => p.idP == idp)

  if (index !== -1) {
    carrito.productos.splice(index, 1)
  }

  res.redirect("/Carrito")
}

function RenderCarritoTotal(req, res) {
  if (!validarSesion(req, res)) return

  const { carrito, total } = carritoModel.calcularTotal(req.session.usuario.id)

  res.render("Carrito", {
    titulo: "Carrito",
    page: "inicio",
    style: "/styles/Carrito.css",
    carrito,
    total
  })
}

function RenderCheckout(req, res) {
  if (!validarSesion(req, res)) return

  res.render("Checkout", {
    titulo: "Checkout",
    page: "inicio",
    style: "/styles/Carrito.css"
  })
}

module.exports = {
  AgregarCarro,
  SumarCarro,
  RestarCarro,
  RenderCarritoTotal,
  RenderCheckout,
  sacarCarrito,
  ActualizarContadorCarrito
}
