const categoriesService = require("../../services/categoriesService")
const { editar } = require("../categoriaController")

const CategoriesApiController = {
  list :  async(req,res) => {
    const data = await categoriesService.getAll()
    res.status(200).json({statusCode:200,data})
  },

  getById : async(req,res) => {
    const data = await categoriesService.getById(req.params.id)

    if(data.length == 0) return res.status(200).json({statusCode:200,message:"No hay categorias"})
    res.status(200).json({statusCode:200,data})

  },

  crear : async(req,res) => {
    const {nombre} = req.body
    const data = await categoriesService.create(nombre)
    res.status(200).json({statusCode:200,message:"Se creo la categoria"})
  },

  eliminar : async(req,res) => {

    const id = req.params.id
    const data = await categoriesService.delete(id)

    if(!data.eliminado) return res.status(404).json({statusCode:404,message:"No se pudo eliminar esa categoria"})
    res.status(200).json({statusCode:200,message:"Categoria eliminada"})
    
  },

  editar : async(req,res) => {
    
    const {nombre} = req.body
    const id = req.params.id

    const data = await categoriesService.update(id,nombre)
    if(!data.changes) return res.status(404).json({statusCode:404,message:"No se encontro la categoria"})
    res.status(200).json({statusCode:200,message:"Se edito correctamente!"})
  }

}

module.exports = CategoriesApiController