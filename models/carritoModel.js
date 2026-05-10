const carrito = require("../Data/Carrito")
const productos = require("../Data/Productos")



function AgregarProductoCarrito(idp){

  const producto = productos.find(p => p.id == idp)
  const existe = carrito.find(p => p.id == idp)

  if(existe){
    existe.cantidad +=1;
  }else{
    const p =  {
      id : idp,
      nombre : producto.nombre,
      precio : producto.precio,
      img : producto.linkImg,
      cantidad : 1
    }
    carrito.push(p)
  }
}


function sumarProducto(idp){

  const producto = productos.find(p => p.id == idp)
  const existe = carrito.find(p => p.id == idp)
  if(existe){
    existe.cantidad +=1;
  }else{
    const p =  {
      id : idp,
      nombre : producto.nombre,
      precio : producto.precio,
      img : producto.linkImg,
      cantidad : 1
    }
    carrito.push(p)
  }

}

function restarProducto(idp){

  const index = carrito.findIndex(p => p.id == idp)
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