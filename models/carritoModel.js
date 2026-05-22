const db = require("../database/db");


async function obtenerCarritoUsuario(idUsuario) {
  return new Promise ((resolve, reject)=>{
    const queryBuscar = "SELECT * FROM carritos WHERE usuario_id = ?"

    db.get(queryBuscar, [idUsuario], (err, carrito)=> {
      if (err){
        console.log(err)
        return reject(err)
      }

      if(carrito){
        return resolve(carrito)
      }

      const queryCrear = "INSERT INTO carritos (usuario_id) VALUES (?)"

      db.run(queryCrear, [idUsuario], function(err){
        if(err){
          console.log(err)
          return reject(err)
        }
        resolve({id: this.lastID, usuario_id: idUsuario})
      })
    })
  })
}


async function agregarProducto(idUsuario, idProducto) {
  const carrito = await obtenerCarritoUsuario(idUsuario)

  return new Promise((resolve, reject) => {
    const queryBuscar = "SELECT * FROM productos WHERE id = ?"

    db.get(queryBuscar, [idProducto], (err, producto)=>{
      if (err){
        console.log(err)
        return reject(err)
      }

      if(!producto){
        return resolve(null)
      }

      const queryExiste = "SELECT * FROM carrito_productos WHERE carrito_id = ? AND producto_id = ?"
      db.get(queryExiste, [carrito.id, idProducto], (err, existe)=> {
        if (err){
          console.log(err)
          return reject(err)
        }
        if(existe){
          if(existe.cantidad >= producto.stock){
            return resolve(false)
          }
          const queryActualizar = "UPDATE carrito_productos SET cantidad = cantidad + 1 WHERE id = ?"

          db.run(queryActualizar, [existe.id], (err) => {
            if(err){
              console.log(err)
              return reject(err)
            }
            resolve(true)
          })

        }else{
          const queryInsertar = "INSERT INTO carrito_productos (carrito_id, producto_id, cantidad) VALUES (?, ?, 1)"
          db.run(queryInsertar, [carrito.id, idProducto], (err) => {
            if(err){
              console.log(err)
              return reject(err)
            }
            resolve(true)
          })
        }
      })
    })
  })
}



async function sumarProducto(idUsuario, idProducto) {
  return agregarProducto(idUsuario, idProducto)
}

async function restarProducto(idUsuario, idProducto) {
  const carrito = await obtenerCarritoUsuario(idUsuario)
  return new Promise((resolve, reject) => {
    const queryBuscar = "SELECT * FROM carrito_productos WHERE carrito_id = ? AND producto_id = ?"

    db.get(queryBuscar, [carrito.id, idProducto], (err,existe) => {
      if (err){
        console.log(err)
        return reject(err)
      }
      if(!existe){
        return resolve(false)
      }

      if(existe.cantidad <= 1){
        const queryEliminar = "DELETE FROM carrito_productos WHERE id = ?"

        db.run(queryEliminar, [existe.id], (err) => {
          if(err){
            console.log(err)
            return reject(err)
          }
          resolve(true)
        })
      }else{
        const queryActualizar = "UPDATE carrito_productos SET cantidad = cantidad - 1 WHERE id = ?"
        db.run(queryActualizar, [existe.id], (err) => {
          if(err){
            console.log(err)
            return reject(err)
          }
          resolve(true)
        })
      }
    })
  })
}



async function calcularTotal(idUsuario) {
  const carrito = await obtenerCarritoUsuario(idUsuario)
  return new Promise((resolve, reject) => {
    const query = `
    SELECT SUM(p.precio * cp.cantidad) AS total
    FROM carrito_productos cp
    JOIN productos p ON cp.producto_id = p.id
    WHERE cp.carrito_id = ?  
    `
    db.get(query, [carrito.id], (err, row) => {
      if (err){
        console.log(err)
        return reject(err)
      }
      resolve(row?.total || 0)
    })
  })
}


async function verificarStock(idUsuario,idProducto) {
  const carrito = await obtenerCarritoUsuario(idUsuario)

  return new Promise((resolve, reject) => {
    const queryProducto = "SELECT stock FROM productos WHERE id = ?"
    db.get(queryProducto, [idProducto], (err, producto) => {
      if (err){
        console.log(err)
        return reject(err)
      }
      if (!producto){
        return resolve(false)
      }
      const queryCarrito = "SELECT cantidad FROM carrito_productos WHERE carrito_id = ? AND producto_id = ?"

      db.get(queryCarrito, [carrito.id, idProducto], (err, carritoProducto) => {

        if (err){
          console.log(err)
          return reject(err)
        }

        const cantidad = carritoProducto
          ? carritoProducto.cantidad
          : 0

        resolve(producto.stock > cantidad)
      })
    })
  })
}

async function obtenerProductosCarrito(idUsuario) {

  const carrito = await obtenerCarritoUsuario(idUsuario)

  return new Promise((resolve, reject) => {

    const query = `
    SELECT cp.producto_id, cp.cantidad, p.nombre, p.precio, p.img
    FROM carrito_productos cp
    JOIN productos p ON cp.producto_id = p.id
    WHERE cp.carrito_id = ?
    `

    db.all(query, [carrito.id], (err, rows) => {

      if (err) {
        console.log(err)
        return reject(err)
      }

      resolve(rows)
    })
  })
}

async function eliminarProducto(idUsuario, idProducto) {

  const carrito =
    await obtenerCarritoUsuario(idUsuario)

  return new Promise((resolve, reject) => {

    const query = `
      DELETE FROM carrito_productos
      WHERE carrito_id = ?
      AND producto_id = ?
    `

    db.run(
      query,
      [carrito.id, idProducto],
      (err) => {

        if (err) {
          console.log(err)
          return reject(err)
        }

        resolve(true)
      }
    )
  })
}


module.exports = {
  obtenerCarritoUsuario,
  agregarProducto,
  sumarProducto,
  restarProducto,
  calcularTotal,
  verificarStock,
  obtenerProductosCarrito,
  eliminarProducto
}