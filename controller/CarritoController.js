const carritoModel = require("../models/carritoModel")
const productos = require("../Data/ProductosData")
function AgregarCarro(req,res){
  const idp = req.params.id
  carritoModel.AgregarProductoCarrito(idp)
  res.redirect("/Detalles/" + idp)
}

function SumarCarro(req,res){
 const carrito = obtenerCarritoUsuario(req);
   const idp = req.params.id
   const producto = productos.find(p => p.idP == idp)
   const existe = carrito.productos.find(p => p.idP == idp)
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
    carrito.productos.push(p)
   }
   console.log(carrito)
   res.redirect("/Carrito")
}

function RestarCarro(req,res){
  const carrito = obtenerCarritoUsuario(req);
  const idp = req.params.id
  const index = carrito.productos.findIndex(p => p.idP == idp)
  if ( index !==-1) {
        carrito.productos[index].cantidad--;
      if(carrito.productos[index].cantidad <= 0){
        carrito.productos.splice(index,1)
      }
    }
  console.log(carrito)
  res.redirect("/Carrito")
}

function RenderCarritoTotal(req,res){
  const carrito = obtenerCarritoUsuario(req);

  let total = 0;

  carrito.productos.forEach(p=> {
    total += p.precio * p.cantidad
  });

  res.render("pages/Carrito",{
    carrito : carrito.productos,
    total
  });
}


function obtenerCarritoUsuario(req) {
   let carrito = listaCarritos.find(c => c.idUsuario == req.session.usuario.id);
  if(!carrito){
    carrito = new Carrito(req.session.usuario.id);
    listaCarritos.push(carrito);
  }
  return carrito;
}

module.exports = {
  AgregarCarro,
  SumarCarro,
  RestarCarro,
  RenderCarritoTotal
}