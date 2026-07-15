const producModel = require("../models/productModel")
const carritoModel = require("../models/carritoModel")
const normalizeId = require("../utils/normalizeId")




async function listar(req,res){
  const {q, orden, categoria} = req.query
  const resultado = await producModel.ProductosInicio()
  let productos = [...resultado.productos]

  if (categoria){
    productos = productos.filter(p => p.categoria.toLowerCase().includes(categoria.toLowerCase()))
  }
  if (q){
    const busqueda = q.toLowerCase()
    productos = productos.filter(p=> p.nombre.toLowerCase().includes(busqueda)|| p.categoria.toLowerCase().includes(busqueda))
  }

  if(orden === "asc")productos.sort((a,b)=> a.precio - b.precio)
  if(orden === "desc")productos.sort((a,b)=> b.precio - a.precio)
  
  res.json({success: true, data: productos})

}


async function producto(req,res) {
  const verificarId = await normalizeId(req.params.id)

  if(verificarId.error === "ID no valido"){
    return res.status(400).json({success: false, error: "ID de producto invalido"})
  }
  if(verificarId.error === "404"){
    return res.status(404).json({success: false, error: "Producto no encontrado"})
  }

  const respuesta = await producModel.getProducto(verificarId.id)
  if(!respuesta){
    return res.status(404).json({success: false, error: "Producto no encontrado"})
  }

  res.json({
    success: true,
    data: respuesta.producto,
  })
}



async function detalle(req,res){
  const verificarId = await normalizeId(req.params.id)

  if(verificarId.error === "ID no valido"){
    return res.status(400).json({success: false, error: "ID de producto invalido"})
  }
  if(verificarId.error === "404"){
    return res.status(404).json({success: false, error: "Producto no encontrado"})
  }

  const respuesta = await producModel.getProducto(verificarId.id)
  if(!respuesta){
    return res.status(404).json({success: false, error: "Producto no encontrado"})
  }

  res.json({success: true, data: {producto: respuesta.producto, relacionados: respuesta.productosRelacionados}})
}



async function Edit(req,res) {
  const id = req.params.id
  const producto = req.body

  const respuesta = await producModel.EditProducto(id,producto)
  if(!respuesta) return res.status(404).json({success: false, error: "No se pudo editar"})

  res.json({success: true, mensaje : "Se edito el producto!"})
}







module.exports = {
  listar,
  producto,
  detalle,
  Edit,
}