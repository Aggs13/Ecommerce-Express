const express = require("express")
const router = express.Router()
const productController = require("../controller/productController")


router.get("/", productController.listar)
router.get("/:id", productController.producto)
router.get("Detalle/:id", productController.detalle)


module.exports = router
