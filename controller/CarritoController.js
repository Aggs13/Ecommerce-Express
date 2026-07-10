const carritoModel = require("../models/carritoModel")
const productModel = require("../models/productModel")
const normalizeId = require("../utils/normalizeId")


async function validarProductoParam(req, res) {
    const idProducto = await normalizeId(req.params.id)

  if (!idProducto) {
    res.status(400).json({ success: false, error: "ID de producto inválido" })
    return null
  }

  const existe = await productModel.existeProducto(idProducto)

  if (!existe) {
    res.status(404).json({ success: false, error: "Producto no encontrado" })
    return null
  }

  return idProducto.id
}



async function agregar(req, res) {
  const idp = await validarProductoParam(req, res)
  if (!idp) return

  const agregado = await carritoModel.agregarProducto(req.usuario.id, idp)

  if(!agregado){
    return res.status(400).json({success: false, error: "Stock insuficiente"})
  }

  res.json({success: true, message: "Producto agregado al carrito"})
}
 
async function sumar(req, res) {
  const idp = await validarProductoParam(req, res)
  if (!idp) return

  await carritoModel.sumarProducto(req.usuario.id, idp)
  res.json({success: true, message: "Cantidad aumentada"})
}

async function restar(req, res) {
  const idp = await validarProductoParam(req, res)
  if (!idp) return

  await carritoModel.restarProducto(req.session.usuario.id, idp)
  res.json({ success: true, message: "Cantidad disminuida" })
}



async function obtener(req, res) {
  const productos = await carritoModel.obtenerProductosCarrito(req.usuario.id)
  const total = await carritoModel.calcularTotal(req.usuario.id)

  const productosConStock = await Promise.all(
    productos.map(async (p) => {
      const stockSuficiente = await carritoModel.verificarStock(req.usuario.id, p.producto_id)
      return { ...p, stockSuficiente }
    })
  )

  res.json({ success: true, data: { productos: productosConStock, total } })

}

async function eliminar(req, res) {
  const idp = await validarProductoParam(req, res)
  if (!idp) return

  await carritoModel.eliminarProducto(req.usuario.id, idp)
  res.json({ success: true, message: "Producto eliminado del carrito" })
}



module.exports = {
  agregar,
  sumar,
  restar,
  obtener,
  eliminar
}