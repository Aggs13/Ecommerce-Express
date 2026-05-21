const carritoModel = require("../models/carritoModel")
const productModel = require("../models/productModel")
const normalizeId = require("../utils/normalizeId")
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

function validarProductoParam(req, res) {
  const idProducto = normalizeId(req.params.id)

  if (!idProducto) {
    res.status(400).send("Error 400 - ID de producto invalido")
    return null
  }

  if (!productModel.existeProducto(idProducto)) {
    res.status(404).send("Error 404 - Producto no encontrado")
    return null
  }

  return idProducto
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
  const idp = validarProductoParam(req, res)
  if (!idp) return

  if (!validarSesion(req, res)) return

  carritoModel.agregarProducto(req.session.usuario.id, idp)
  res.redirect("/Detalles/" + idp)
}

function SumarCarro(req, res) {
  const idp = validarProductoParam(req, res)
  if (!idp) return

  if (!validarSesion(req, res)) return
  carritoModel.sumarProducto(req.session.usuario.id, idp)
  res.redirect("/Carrito")
}

function RestarCarro(req, res) {
  const idp = validarProductoParam(req, res)
  if (!idp) return

  if (!validarSesion(req, res)) return

  carritoModel.restarProducto(req.session.usuario.id, idp)
  res.redirect("/Carrito")
}

function sacarCarrito(req, res) {
  const idp = validarProductoParam(req, res)
  if (!idp) return

  if (!validarSesion(req, res)) return

  const carrito = obtenerCarritoUsuario(req)
  const index = carrito.productos.findIndex(p => p.idP == idp)

  if (index !== -1) {
    carrito.productos.splice(index, 1)
  }

  res.redirect("/Carrito")
}

function RenderCarritoTotal(req, res) {
  if (!validarSesion(req, res)) return
  const usuarioId = req.session.usuario.id
  const { carrito, total } = carritoModel.calcularTotal(req.session.usuario.id)

  const carritoConStock = carrito.map(p => ({...p,stockSuficiente: carritoModel.verificarStock(usuarioId, p.idP)}))

  res.render("Carrito", {
    titulo: "Carrito",
    page: "inicio",
    style: "/styles/Carrito.css",
    carrito: carritoConStock,
    total,

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
