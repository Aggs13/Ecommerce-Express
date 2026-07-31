const categoriaModel = require("../models/categoriaModel")

const categoriesService = {
  getAll: async () => {
    return await categoriaModel.listarTodas()
  },

  getById: async (id) => {
    return await categoriaModel.getById(id)
  },

  create: async (nombre) => {
    return await categoriaModel.crear(nombre)
  },

  update: async (id, nombre) => {
    return await categoriaModel.editar(id, nombre)
  },

  delete: async (id) => {
    return await categoriaModel.eliminar(id)
  }
}

module.exports = categoriesService