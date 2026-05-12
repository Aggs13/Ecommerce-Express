const carrito = require("../Data/Carrito")
const productos = require("../Data/ProductosData")



function AgregarProductoCarrito(idp){

  const producto = productos.find(p => p.idP == idp)
  const existe = carrito.find(p => p.idP == idp)

  if(existe){
    existe.cantidad +=1;
  }else{
    const p =  {
      idP : idp,
      nombre : producto.nombre,
      precio : producto.precio,
      img : producto.img,
      cantidad : 1
    }
    carrito.push(p)
  }
}


function sumarProducto(idp){

  const producto = productos.find(p => p.idP == idp)
  const existe = carrito.find(p => p.idP == idp)
  if(existe){
    existe.cantidad +=1;
  }else{
    const p =  {
      idP : idp,
      nombre : producto.nombre,
      precio : producto.precio,
      img : producto.linkImg,
      cantidad : 1
    }
    carrito.push(p)
  }

}

function restarProducto(idp){

  const index = carrito.findIndex(p => p.idP == idp)
  if ( index !==-1) {
    carrito[index].cantidad--;
    if(carrito[index].cantidad <= 0){
      carrito.splice(index,1)
    }
  }

}


function calcularTotal(){
  let total = 0;
  carrito.forEach(p=> {
    total += p.precio * p.cantidad
  })

  return {carrito,total}
}


module.exports = {
  AgregarProductoCarrito,
  sumarProducto,
  restarProducto,
  calcularTotal
}