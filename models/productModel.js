// Funciones CRUD 
const productos = require("../Data/Productos")


function ProductosInicio(){
  const numeros = [...Array(productos.length).keys()].sort(() => Math.random() - 0.5).slice(0,4)
  return {productos,numeros}
}

function getProducto(id){
  const producto = productos.find(p => p.id == id)
  return producto
}

module.exports = {
  ProductosInicio,
  getProducto
}