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

module.exports = {
  ProductosInicio,
  getProducto
}