const carritoModel = require("../models/carritoModel")

function AgregarCarro(req,res){
  const idp = req.params.id
  carritoModel.AgregarProductoCarrito(idp)
  res.redirect("/Detalles/" + idp)
}

function SumarCarro(req,res){
  const idp = req.params.id
  carritoModel.sumarProducto(idp)
  res.redirect("/Carrito")
}

function RestarCarro(req,res){
  const idp = req.params.id
  carritoModel.restarProducto(idp)
  res.redirect("/Carrito")
}

function CarritoRender(req,res){
  const resultado = carritoModel.calcularTotal()
  res.render("Carrito",{
    carrito : resultado.carrito,
    total : resultado.total
  })
}

module.exports = {
  AgregarCarro,
  SumarCarro,
  RestarCarro,
  CarritoRender
}