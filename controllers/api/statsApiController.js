const productModel = require("../../models/productModel")
const categoriaModel = require("../../models/categoriaModel")

const statsApiController = {
  getStats: async (req, res) => {
    const totalProducts = await productModel.countAll()
    const totalCategories = await categoriaModel.countAll()
    res.json({ totalProducts, totalCategories })
  }
}

module.exports = statsApiController
