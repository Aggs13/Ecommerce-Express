const express = require("express")
const router = express.Router()
const productController = require("../controller/productController")

router.get("/inicio", productController.mostrarProductosIncio)
router.get("/Detalles/:id", productController.productoDetalles)
router.get("/buscar", productController.buscarProductos)

module.exports = router
