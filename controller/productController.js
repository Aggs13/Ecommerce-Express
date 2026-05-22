const producModel = require("../models/productModel")
const carritoModel = require("../models/carritoModel")
const normalizeId = require("../utils/normalizeId")

async function mostrarProductosIncio(req,res){
  const result = await producModel.ProductosInicio()
  res.render("Inicio",{
    titulo: "Inicio",
    page: "inicio",
    style: "/styles/inicio.css",
    productos : result.productos,
    numeros : result.numeros
  })
}

async function productoDetalles(req,res){
  const idProducto = normalizeId(req.params.id)

  if (!idProducto) {
    return res.status(400).send("Error 400 - ID de producto invalido")
  }

  const respuesta = await producModel.getProducto(idProducto)

  if (!respuesta) {
    return res.status(404).send("Error 404 - Producto no encontrado")
  }

  let stockSuficiente = true

  if (req.session.usuario) {
    stockSuficiente = carritoModel.verificarStock(req.session.usuario.id,idProducto)
  }

  res.render("Detalle",{
    titulo: respuesta.producto.nombre,
    page: "inicio",
    style: "/styles/Detalle.css",
    producto : respuesta.producto,
    productosRelacionados : respuesta.productosRelacionados,
    stockSuficiente
  })
}

async function buscarProductos(req, res){
  const resultado = await producModel.ProductosInicio()
  const busqueda = req.query.q ? req.query.q.toLowerCase() : ""

  const productos = resultado.productos.filter(p => p.nombre.toLowerCase().includes(busqueda) || p.categoria.toLowerCase().includes(busqueda))

  res.render("Busqueda", {
    titulo: "Busqueda",
    page: "inicio",
    style: "/styles/inicio.css",
    productos,
    busqueda
  })
}

async function mostrarTodosProductos(req, res) {
  const resultado = await producModel.ProductosInicio()
  const orden = req.query.orden
  const categoria = req.query.categoria || ""
  let productos = [...resultado.productos]

  if (categoria) {
    productos = productos.filter(p => p.categoria.toLowerCase().includes(categoria.toLowerCase()))
  }

  if (orden === "asc") {
    productos.sort((a, b) => a.precio - b.precio)
  }

  if (orden === "desc") {
    productos.sort((a, b) => b.precio - a.precio)
  }

  res.render("Productos", {
    titulo: "Productos",
    page: "inicio",
    style: "/styles/inicio.css",
    productos,
    orden,
    categoria
  })
}

function mostrarPorCategoria(req,res){
  mostrarTodosProductos(req, res)
}

module.exports = {
  mostrarProductosIncio,
  productoDetalles,
  buscarProductos,
  mostrarTodosProductos,
  mostrarPorCategoria
}