const db = require("../dataBase/db")

function listarTodas() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM categorias ORDER BY nombre ASC", [], (err, rows) => {
      if (err) return reject(err)
      resolve(rows)
    })
  })
}

function getById(id){
  return new Promise((resolve,reject) => {
    db.all("SELECT * FROM categorias WHERE id = ?",[id],(err,rows) => {
      if(err) return reject(err)
      resolve(rows)
    })
  })
}


function crear(nombre) {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO categorias (nombre) VALUES (?)", [nombre], function (err) {
      if (err) return reject(err)
      resolve({ id: this.lastID, nombre })
    })
  })
}

function eliminar(id) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM categorias WHERE id = ?", [id], function (err) {
      if (err) return reject(err)
      resolve({ eliminado: this.changes > 0 })
    })
  })
}

function editar(id, nombre) {
  return new Promise((resolve, reject) => {
    db.run("UPDATE categorias SET nombre = ? WHERE id = ?", [nombre, id], function (err) {
      if (err) return reject(err)
      resolve({ id: Number(id), nombre,changes : this.changes })
    })
  })
}

function countAll() {
  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(*) AS total FROM categorias", [], (err, row) => {
      if (err) return reject(err)
      resolve(row.total)
    })
  })
}

module.exports = { listarTodas, crear, eliminar, editar, getById, countAll}
