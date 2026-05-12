const carritoModel = require("../models/carritoModel")

function validarSesion(req, res) {
  if (!req.session.usuario) {
    res.redirect("/")
    return false
  }

  return true
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

function RenderCarritoTotal(req, res) {
  if (!validarSesion(req, res)) return

  const { carrito, total } = carritoModel.calcularTotal(req.session.usuario.id)

  res.render("Carrito", {
    carrito,
    total
  })
}

module.exports = {
  AgregarCarro,
  SumarCarro,
  RestarCarro,
  RenderCarritoTotal
}
