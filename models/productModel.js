// Funciones CRUD 

const productos = require("../Data/Productos")


function obtenerProductos(){
  return productos
}

module.exports = {
  obtenerProductos
}