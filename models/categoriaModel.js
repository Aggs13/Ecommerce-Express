const db = require("../dataBase/db")

function listarTodas() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM categorias ORDER BY nombre ASC", [], (err, rows) => {
      if (err) return reject(err)
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
      resolve({ eliminado: true })
    })
  })
}

module.exports = { listarTodas, crear, eliminar }
