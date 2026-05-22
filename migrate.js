const db = require('./database/db');
const productos = require('./data/ProductosData');

db.serialize(()=>{
  const migracion = db.prepare('INSERT OR IGNORE INTO productos (id, nombre, descripcion, precio, img, categoria, stock) VALUES (?, ?, ?, ?, ?, ?, ?)');

  productos.forEach((productos) => {
    migracion.run(productos.idP, productos.nombre, productos.descripcion, productos.categoria, productos.precio, productos.img, productos.stock);
    
  });

  migracion.finalize();
})