const productModel = require("../models/productModel")

const productsService = {
  getAll: async () => {
    const result = await productModel.ProductosInicio()
    return result.productos
  },

  getById: async (id) => {
    const result = await productModel.getProducto(id)
    return result
  },

  create: async (data) => {
    const result = await productModel.CrearProducto(data)
    return result
  },

  update: async (id, data) => {
    await productModel.EditProducto(id, data)
    return true
  },

  delete: async (id) => {
    const result = await productModel.eliminarProducto(id)
    return result
  }
}

module.exports = productsService