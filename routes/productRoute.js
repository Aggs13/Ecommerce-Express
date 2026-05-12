const express = require("express")
const router = express.Router()
const productController = require("../controller/productController")


router.get("/Inicio",productController.mostrarProductosIncio)
router.get("/Detalles/:id",productController.productoDetalles)

module.exports = router