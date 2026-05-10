const producModel = require("../models/productModel")


function mostrarProductosIncio(req,res){
  const result = producModel.ProductosInicio()
  res.render("Inicio",{
    productos : result.productos,
    numeros : result.numeros
  })
}


function productoDetalles(req,res){
  const producto = producModel.getProducto(req.params.id)
  res.render("Detalle",{producto})
}

module.exports = {
  mostrarProductosIncio,
  productoDetalles
}