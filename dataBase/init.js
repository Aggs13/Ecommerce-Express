const db = require('./db');

db.serialize(() => {
      db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `)
    db.run(`
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY NOT NULL,
      nombre TEXT NOT NULL,
      descripcion TEXT,
      categoria TEXT,
      precio REAL NOT NULL,
      img TEXT,
      stock INTEGER DEFAULT 0
    )
  `)
    db.run(`
    CREATE TABLE IF NOT EXISTS carritos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
  `)
    db.run(`
    CREATE TABLE IF NOT EXISTS carrito_productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      carrito_id INTEGER NOT NULL,
      producto_id INTEGER NOT NULL,
      cantidad INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY (carrito_id) REFERENCES carritos(id),
      FOREIGN KEY (producto_id) REFERENCES productos(id)
    )
  `)
    db.run(`
      CREATE TABLE IF NOT EXISTS orders (
        id_orders INTEGER PRIMARY KEY NOT NULL
      )
    `)
    db.run(`
        CREATE TABLE IF NOT EXISTS order_items (
          id_order_items INTEGER PRIMARY KEY NOT NULL
          )
      `)
    db.run(`
      CREATE TABLE IF NOT EXISTS categorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL UNIQUE
      )
    `)
})
console.log("Tablas creadas")