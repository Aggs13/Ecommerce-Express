const productos = require("../Data/ProductosData")
const { Carrito, listaCarritos } = require("../Data/Carrito")

function obtenerCarritoUsuario(idUsuario) {
  let carrito = listaCarritos.find(c => c.idUsuario == idUsuario)

  if (!carrito) {
    carrito = new Carrito(idUsuario)
    listaCarritos.push(carrito)
  }

  return carrito
}



function agregarProducto(idUsuario, idp) {
  const carrito = obtenerCarritoUsuario(idUsuario)
  const producto = productos.find(p => p.idP == idp)

  if (!producto) return

  const existe = carrito.productos.find(p => p.idP == idp)

  if (existe) {
    existe.cantidad += 1
    return
  }

  

  carrito.productos.push({
    idP: producto.idP,
    nombre: producto.nombre,
    precio: producto.precio,
    img: producto.img,
    cantidad: 1
  })
}



function sumarProducto(idUsuario, idp) {
  agregarProducto(idUsuario, idp)
}

function restarProducto(idUsuario, idp) {
  const carrito = obtenerCarritoUsuario(idUsuario)
  const index = carrito.productos.findIndex(p => p.idP == idp)

  if (index === -1) return

  carrito.productos[index].cantidad -= 1

  if (carrito.productos[index].cantidad <= 0) {
    carrito.productos.splice(index, 1)
  }
}

function calcularTotal(idUsuario) {
  const carritoUsuario = obtenerCarritoUsuario(idUsuario)
  const total = carritoUsuario.productos.reduce((acum, p) => {
    return acum + p.precio * p.cantidad
  }, 0)

  return {
    carrito: carritoUsuario.productos,
    total
  }
}

module.exports = {
  obtenerCarritoUsuario,
  agregarProducto,
  sumarProducto,
  restarProducto,
  calcularTotal
}