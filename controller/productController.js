const producModel = require("../models/productModel")


function mostrarProductosIncio(req,res){
  const result = producModel.ProductosInicio()
  res.render("Inicio",{
    titulo: "Inicio",
    page: "inicio",
    style: "/styles/inicio.css",
    productos : result.productos,
    numeros : result.numeros
  })
}


function productoDetalles(req,res){
  const producto = producModel.getProducto(req.params.id)
  res.render("Detalle",{
    titulo: producto.nombre,
    page: "inicio",
    style: "/styles/Detalle.css",
    producto
  })
}

module.exports = {
  mostrarProductosIncio,
  productoDetalles
}
