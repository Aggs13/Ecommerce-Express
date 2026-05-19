// Funciones CRUD 
const productos = require("../Data/ProductosData")


function ProductosInicio(){
  const numeros = [...Array(productos.length).keys()].sort(() => Math.random() - 0.5).slice(0,4)
  return {productos,numeros}
}

function getProducto(id){
  const producto = productos.find(p => p.idP == id)
  return producto
}

function filtrarCategoria(categoria){
  const productosCategoria = productos.filter(p => p.categoria == categoria)
  return productosCategoria
}

module.exports = {
  ProductosInicio,
  getProducto,
  filtrarCategoria
}