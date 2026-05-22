const carritoModel = require("../models/carritoModel")
const productModel = require("../models/productModel")
const normalizeId = require("../utils/normalizeId")


function validarSesion(req, res) {
  if (!req.session.usuario) {
    res.redirect("/")
    return false
  }

  return true
}


async function validarProductoParam(req, res) {
    const idProducto = normalizeId(req.params.id)

  if (!idProducto) {
    res.status(400).send("Error 400 - ID de producto invalido")
    return null
  }

  const existe =
    await productModel.existeProducto(idProducto)

  if (!existe) {
    res.status(404).send("Error 404 - Producto no encontrado")
    return null
  }

  return idProducto
}

async function ActualizarContadorCarrito(req, res, next) {
  if (!req.session.usuario) {
    res.locals.cantidadCarrito = 0
    return next()
  }

  const resultado =
    await carritoModel.obtenerProductosCarrito(
      req.session.usuario.id
    )

  const cantidad =
    resultado.reduce((total, p) => {
      return total + p.cantidad
    }, 0)

  res.locals.cantidadCarrito = cantidad

  next()
}

async function AgregarCarro(req, res) {
  const idp = await validarProductoParam(req, res)
  if (!idp) return

  if (!validarSesion(req, res)) return

  const agregado =
  await carritoModel.agregarProducto(
    req.session.usuario.id,
    idp
  )

  if(!agregado){
    return res.redirect("/Detalles/" + idp)
  }
  res.redirect("/Detalles/" + idp)
}
 
async function SumarCarro(req, res) {
  const idp = await validarProductoParam(req, res)
  if (!idp) return

  if (!validarSesion(req, res)) return
  await carritoModel.sumarProducto(req.session.usuario.id, idp)
  res.redirect("/Carrito")
}

async function RestarCarro(req, res) {
  const idp = await validarProductoParam(req, res)
  if (!idp) return

  if (!validarSesion(req, res)) return

  await carritoModel.restarProducto(req.session.usuario.id, idp)
  res.redirect("/Carrito")
}

async function sacarCarrito(req, res) {
  if (!validarSesion(req, res)) return

  const idp = await validarProductoParam(req, res)

  if (!idp) return

  await carritoModel.eliminarProducto(
    req.session.usuario.id,
    idp
  )

  res.redirect("/Carrito")
}

async function RenderCarritoTotal(req, res) {
  if (!validarSesion(req, res)) return

  const usuarioId = req.session.usuario.id

  const carrito =
    await carritoModel.obtenerProductosCarrito(
      usuarioId
    )

  const total =
    await carritoModel.calcularTotal(
      usuarioId
    )

  const carritoConStock =
    await Promise.all(
      carrito.map(async (p) => {

        const stockSuficiente =
          await carritoModel.verificarStock(
            usuarioId,
            p.producto_id
          )

        return {
          ...p,
          stockSuficiente
        }
      })
    )

  res.render("Carrito", {
    titulo: "Carrito",
    page: "inicio",
    style: "/styles/Carrito.css",
    carrito: carritoConStock,
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