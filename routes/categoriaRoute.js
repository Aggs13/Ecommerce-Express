const express = require("express")
const router = express.Router()
const categoriaController = require("../controller/categoriaController")

router.get("/", categoriaController.listar)
router.post("/crear", categoriaController.crear)
router.delete("/:id", categoriaController.eliminar)
router.put("/:id", categoriaController.editar)

module.exports = router
