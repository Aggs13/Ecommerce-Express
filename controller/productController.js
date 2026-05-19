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

function buscarProductos(req, res){
  const resultado = producModel.ProductosInicio()
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

module.exports = {
  mostrarProductosIncio,
  productoDetalles,
  buscarProductos
}
