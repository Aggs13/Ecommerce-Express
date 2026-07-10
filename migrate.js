const db = require('./dataBase/db')
const productos = require('./Data/ProductosData')

db.serialize(() => {
  const migracion = db.prepare(
    'INSERT OR IGNORE INTO productos (id, nombre, descripcion, precio, img, categoria, stock) VALUES (?, ?, ?, ?, ?, ?, ?)'
  )

  productos.forEach((p) => {
    migracion.run(p.idP, p.nombre, p.descripcion, p.precio, p.img, p.categoria, p.stock)
  })

  migracion.finalize()
})