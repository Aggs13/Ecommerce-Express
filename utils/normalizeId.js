const db = require("../dataBase/db")

async function normalizeId(idProducto) {


  // validar si es numero
  if (!/^\d+$/.test(idProducto))  return res.status(400).json({error:"ID no valido"})
  
    //Validar si existe en la BD 
    const producto = await new Promise((resolve,reject) => {
      const query = "SELECT * FROM productos WHERE id = ?"
        db.get(query,[idProducto],(err,row) => {
          // error en la interno
          if(err) return reject(err)
          resolve(row)
        })
    })

    if(!producto) return res.status(404).json({error:"404"})

  return {id:idProducto}
}

module.exports = normalizeId
