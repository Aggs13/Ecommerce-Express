const producModel = require("../models/productModel")

function mostrarProductos(req,res){
  const productos = producModel.obtenerProductos()
  console.log(productos)
  res.send("Prueba",{productos})
}

module.exports = {
  mostrarProductos
}