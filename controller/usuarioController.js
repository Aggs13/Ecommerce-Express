const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const usuarioModel = require("../models/usuarioModel")
const { SECRET } = require("../middleware/authMiddleware")



async function Registro(req,res){
  
  try {
    let {nombre, apellido,email,password,repetirPassword} = req.body

    nombre = nombre.trim()
    apellido = apellido.trim()
    email = email.trim()

    if(!nombre || !apellido || !email || !password){
      return res.json({success: false, error: "Todos los campos son obligatorios"})
    }
    
    //Email Valido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(!emailRegex.test(email)){
      return res.status(400).json({ success: false, error: "El email no es válido" })
    }
    //Password != repetirPassword
      if (password !== repetirPassword) {

        return res.status(400).json({ success: false, error: "Las contraseñas no coinciden" })
      }
    //Contraseña Valida
    if(password.length < 8){
      return res.status(400).json({ success: false, error: "La contraseña debe tener al menos 8 caracteres" })
    }

      //Al menos una letra en el password
      if(!/[a-zA-Z]/.test(password)){
        return res.status(400).json({ success: false, error: "La contraseña debe contener al menos una letra" })
      }
      //Al menos un numero en el password
      if(!/\d/.test(password)){
        return res.status(400).json({ success: false, error: "La contraseña debe contener al menos un número" })
      }
      //Al menos un caracter especial en el password
      if(!/[!@#$%^&*(),.?":{}|<>]/.test(password)){
        return res.status(400).json({ success: false, error: "La contraseña debe contener al menos un carácter especial" })
      }
      //Password prohibidas
      const passwordLower = password.toLowerCase()

      const prohibidas = ["password","1234","qwerty","miecommerce",nombre.toLowerCase()]

      const esProhibida = prohibidas.some(p => passwordLower.includes(p))

      if(esProhibida){
        return res.status(400).json({ success: false, error: "La contraseña no puede contener palabras comunes" })
      }

      //Password != email
      if(password.toLowerCase().includes(email.toLowerCase())){
        return res.status(400).json({ success: false, error: "La contraseña no puede ser igual que el email" })
      }



    //Registrar Usuario
    const hashedPassword = await bcrypt.hash(password,10)
    await usuarioModel.agregarUsuario(nombre,apellido,email,hashedPassword)


    //generar JWT
    const usuario = await usuarioModel.verificarEmail(email)
    const token = jwt.sign(
      {id: usuario.id, email: usuario.email},
      SECRET,
      {expiresIn: "7d"}
    )

    res.status(201).json({success: true, token, usuario: {id: usuario.id, nombre: usuario.nombre, email: usuario.email}})
  
  }catch (err) {
    res.status(400).json({success: false, error: err.message})
  }
}


async function  login(req,res) {
  try{
    const {email, password} = req.body

    const usuario = await usuarioModel.verificarEmail(email)
    if(!usuario){
      return res.status(401).json({success: false, error: "Credenciales inválidas"})
    }

    const passwordValida = await bcrypt.compare(password, usuario.password)
    if(!passwordValida){
      return res.status(401).json({success: false, error: "Credenciales inválidas"})
    }

    const token = jwt.sign(
      {id: usuario.id, email: usuario.email, nombre: usuario.nombre},
      SECRET,
      {expiresIn: "7d"}
    )

    res.json({success: true, token, usuario: {id: usuario.id, nombre: usuario.nombre, email: usuario.email}})

  }catch(err){
    res.status(500).json({success: false, error: "Error interno del servidor"})
  }
  
}


module.exports = {
  Registro,
  login
}