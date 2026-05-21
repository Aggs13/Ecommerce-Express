// Funciones CRUD 
const productos = require("../Data/ProductosData")

function ProductosInicio(){
  const numeros = [...Array(productos.length).keys()].sort(() => Math.random() - 0.5).slice(0,4)
  return {productos,numeros}
}

function getProducto(id){
  const producto = productos.find(p => p.idP == id)
  if (!producto) return null

  const productosRelacionados = productos.filter(p => p.categoria == producto.categoria && p.idP != producto.idP)

  return {producto,productosRelacionados}
}

function existeProducto(id) {
  return productos.some(p => p.idP == id)
}

function filtrarCategoria(categoria){
  const productosCategoria = productos.filter(p => p.categoria == categoria)
  return productosCategoria
}

module.exports = {
  ProductosInicio,
  getProducto,
  existeProducto,
  filtrarCategoria
}