class Producto {
  constructor(idP,nombre,descripcion,precio,img, categoria,stock){
    this.idP = idP
    this.nombre = nombre
    this.descripcion = descripcion
    this.precio = precio
    this.img = img
    this.categoria = categoria
    this.stock = stock
  }
}

module.exports = Producto