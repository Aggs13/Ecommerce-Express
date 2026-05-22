const db = require("../database/db")

async function agregarUsuario(nombre, apellido, email, password) {

  const usuario = await VerificarRegistro(email)
  if(usuario != null) throw new Error("El usuario con ese email ya esta registrado")

  return new Promise((resolve,reject) => {
  
    const query = "INSERT INTO usuarios(nombre,apellido,email,password) VALUES (?, ?, ?, ?)"
    db.run(query,[nombre,apellido,email,password],(err)=> {
      if(err){
        return reject("No fue posible registrar")
      }
      resolve("Bienvenido " + nombre)
    })

  })

}


async function VerificarInicio(email,password) {
  return new Promise((resolve,reject) => {

    const query = "SELECT id,nombre,email FROM usuarios WHERE email = ? AND password = ?"
    db.get(query,[email,password],(err,row) => {
      if(err){
        console.log(err)
        return reject(err)
      }
      resolve(row)
    })
  })
}



async function  VerificarRegistro(email) {
  return new Promise((resolve,reject) => {

    const query = "SELECT email FROM usuarios WHERE email = ?"

    db.get(query,[email], (err,row) => {
      if(err){
        console.log(err)
        return reject(err)
        
      }
      resolve(row)
    })
  })


}

module.exports = {
  agregarUsuario,
  VerificarInicio
}