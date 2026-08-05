const express = require("express")
const router = express.Router()
const productController = require("../controller/productController")


router.get("/", productController.listar)
router.get("/:id", productController.producto)
router.get("/Detalle/:id", productController.detalle)
router.post("/crear", productController.Crear)
router.post("/", productController.create)
router.post("/new", productController.create)
router.delete("/:id", productController.eliminar)
router.put("/Edit/:id", productController.Edit)

module.exports = router
