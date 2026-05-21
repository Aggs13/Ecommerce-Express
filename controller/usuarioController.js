const usuarioModel = require("../models/usuarioModel")
const { Carrito, listaCarritos } = require("../Data/Carrito")



async function Registro(req,res){
  let mensaje = ""
  try {
    const {nombre, apellido,email,password} = req.body
    mensaje = await usuarioModel.agregarUsuario(nombre,apellido,email,password)
    res.render("Registrar", {
      layout: false,
      mensaje : mensaje
    })

  } catch (err) {
     res.render("Registrar", {
      layout: false,
      mensaje: err.message
    })
  }
}


async function  IniciarSesion(req,res) {
  try {
    const {email,password} = req.body
    const usuario = await usuarioModel.VerificarInicio(email,password)

    if(usuario == null) return res.render("Login",{ layout:false, mensaje:"Contraseña o Email incorrectos"} ) 
    req.session.usuario = usuario
    res.redirect("/inicio")
    
      
  } catch (err) {
    
    res.render("Login", {
      layout:false,
      mensaje: err.message
    })
  }
  
}


module.exports = {
  Registro,
  IniciarSesion
}