const usuarioModel = require("../models/usuarioModel")
const { Carrito, listaCarritos } = require("../Data/Carrito")



async function Registro(req,res){
  let mensaje = ""
  try {
    let {nombre, apellido,email,password,repetirPassword} = req.body

    nombre = nombre.trim()
    apellido = apellido.trim()
    email = email.trim()

    if(!nombre || !apellido || !email || !password){
      return res.render("Registrar", {
        layout: false,
        mensaje : "Todos los campos son obligatorios"
      })
    }
    
    //Email Valido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(!emailRegex.test(email)){
      return res.render("Registrar", {
        layout: false,
        mensaje : "El email no es válido"
      })
    }
    //Password != repetirPassword
      if (password !== repetirPassword) {

        return res.render("Registrar", {
          layout: false,
          mensaje: "Las contraseñas no coinciden"
        })
      }
    //Contraseña Valida
    if(password.length < 8){
      return res.render("Registrar", {
        layout: false,
        mensaje : "La contraseña debe tener al menos 8 caracteres"
      })
    }

      //Al menos una letra en el password
      if(!/[a-zA-Z]/.test(password)){
        return res.render("Registrar", {
          layout: false,
          mensaje : "La contraseña debe contener al menos una letra"
        })
      }
      //Al menos un numero en el password
      if(!/\d/.test(password)){
        return res.render("Registrar", {
          layout: false,
          mensaje : "La contraseña debe contener al menos un número"
        })
      }
      //Al menos un caracter especial en el password
      if(!/[!@#$%^&*(),.?":{}|<>]/.test(password)){
        return res.render("Registrar", {
          layout: false,
          mensaje : "La contraseña debe contener al menos un caracter especial"
        })
      }
      //Password prohibidas
      const passwordLower = password.toLowerCase()

      const prohibidas = ["password","1234","qwerty","miecommerce",nombre.toLowerCase()]

      const esProhibida = prohibidas.some(p => passwordLower.includes(p))

      if(esProhibida){
        return res.render("Registrar", {
          layout: false,
          mensaje : "La contraseña no puede contener palabras comunes o el nombre del usuario"
        })
      }

      //Password != email
      if(password.toLowerCase().includes(email.toLowerCase())){
        return res.render("Registrar", {
          layout: false,
          mensaje : "La contraseña no puede ser igual que el email"
        })
      }

    //Registrar Usuario
    const mensaje= await usuarioModel.agregarUsuario(nombre,apellido,email,password)

    const usuario = await usuarioModel.VerificarInicio(email,password)

    req.session.usuario = usuario
    
    res.redirect("/inicio")
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