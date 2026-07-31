const categoriesService = require("../../services/categoriesService")

const categoriesApiController = {
  list: async (req, res) => {
    const data = await categoriesService.getAll()
    res.json(data)
  },

  getById: async (req, res) => {
    const data = await categoriesService.getById(req.params.id)
    if (data.length === 0) {
      return res.status(404).json({ error: "Categoria no encontrada" })
    }
    res.json(data)
  },

  crear: async (req, res) => {
    const { nombre } = req.body
    if (!nombre) {
      return res.status(400).json({ error: "Falta el campo nombre" })
    }
    const data = await categoriesService.create(nombre)
    res.status(201).json(data)
  },

  eliminar: async (req, res) => {
    const data = await categoriesService.delete(req.params.id)
    if (!data.eliminado) {
      return res.status(404).json({ error: "No se pudo eliminar esa categoria" })
    }
    res.status(204).send()
  },

  editar: async (req, res) => {
    const { nombre } = req.body
    const data = await categoriesService.update(req.params.id, nombre)
    if (!data.changes) {
      return res.status(404).json({ error: "No se encontro la categoria" })
    }
    res.json({ mensaje: "Se edito correctamente!" })
  }
}

module.exports = categoriesApiController