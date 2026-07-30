// Funciones CRUD 
const db = require("../database/db")

async function ProductosInicio(){
  return new Promise((resolve,rejects)=>{
    const query = "SELECT * FROM productos"

    db.all(query,[], (err, rows)=> {
      if (err){
        console.log(err)
        return rejects(err)
      }
      const numeros = [...Array(rows.length).keys()]
      .sort(()=> Math.random() - 0.5)
      .slice(0, 4)

      resolve({productos: rows, numeros})

    })
  })
}

function getProducto(id){
    return new Promise((resolve, rejects)=>{
      const query = "SELECT * FROM productos WHERE id = ?"

      db.get(query, [id], (err, producto) => {
        if (err){
          console.log(err)
          return rejects(err)
        }
        if (!producto) {
          return resolve(null)
        }
        const queryRelacionados = "SELECT * FROM productos WHERE categoria = ? AND id != ?"

        db.all(queryRelacionados, [producto.categoria, id], (err, productosRelacionados)=>{
          if(err){
            console.log(err)
            return rejects(err)
          }
          resolve({producto, productosRelacionados})
        })
      })
    })
}


function existeProducto(id) {
  return new Promise((resolve, rejects) => {
    const query = "SELECT COUNT(*) AS count FROM productos WHERE id = ?"
  db.get(query, [id], (err, row) =>{
    if (err){
      console.log(err)
      return rejects(err)
    }
    resolve(!!row)
  })
  
  })
  
}

function filtrarCategoria(categoria){
  return new Promise((resolve, rejects) => {
    const query = "SELECT * FROM productos  WHERE categoria = ?"

    db.all(query, [categoria], (err, rows)=> {
      if (err){
        console.log(err)
        return rejects(err)
      }
      resolve(rows)
    })
  })
}


function EditProducto(id,p){
  return new Promise((resolve,rejects) => {
    const query = `UPDATE productos SET nombre = ?,  descripcion = ? , precio = ?, stock = ?, img = ? WHERE id = ?`
    db.all(query,[p.nombre, p.descripcion, p.precio, p.stock, p.img, id], (err,rows) => {

      if(err){

        console.log(err)
        return rejects(err)

      }

      resolve(rows)

    })
  })
}
function CrearProducto(p) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO productos (nombre, descripcion, precio, stock, categoria, img) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [p.nombre, p.descripcion, p.precio, p.stock, p.categoria, p.img], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID });
    });
  });
}

function eliminarProducto(id) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM productos WHERE id = ?";
    db.run(query, [id], function (err) {
      if (err) return reject(err);
      resolve({ deleted: this.changes > 0 });
    });
  });
}

module.exports = {
  ProductosInicio,
  getProducto,
  existeProducto,
  filtrarCategoria,
  EditProducto,
  CrearProducto,
  eliminarProducto
}