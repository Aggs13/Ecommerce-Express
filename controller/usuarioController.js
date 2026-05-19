const usuarioModel = require("../models/usuarioModel")
const { Carrito, listaCarritos } = require("../Data/Carrito")

function ValidarUsuario(req,res){

  const { email, password } = req.body
  const usuario = usuarioModel.validarUsuario(email, password)

  if (!usuario) {
    return res.redirect("/")
  }

  req.session.usuario = usuario
  res.redirect("/inicio")
}




function Registro(req,res){
  const { nombre, apellido, email, password } = req.body

  usuarioModel.agregarUsuario(nombre, apellido, email, password)

  const usuario = usuarioModel.validarUsuario(email, password)
  const nuevoCarrito = new Carrito(usuario.id)

  listaCarritos.push(nuevoCarrito)
  req.session.usuario = usuario

  res.redirect("/inicio")
}




module.exports = {
  ValidarUsuario,
  Registro
}