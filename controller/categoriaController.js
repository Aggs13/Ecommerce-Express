const categoriaModel = require("../models/categoriaModel")

async function listar(req, res) {
  try {
    const data = await categoriaModel.listarTodas()
    res.json({ success: true, data })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}

async function crear(req, res) {
  try {
    const { nombre } = req.body
    if (!nombre) return res.status(400).json({ success: false, error: "Nombre requerido" })
    const nueva = await categoriaModel.crear(nombre)
    res.json({ success: true, data: nueva })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}

async function eliminar(req, res) {
  try {
    const { id } = req.params
    await categoriaModel.eliminar(id)
    res.json({ success: true, message: "Categoría eliminada" })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}

module.exports = { listar, crear, eliminar }
