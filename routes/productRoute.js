const express = require("express")
const router = express.Router()
const productController = require("../controller/productController")

router.get("/prueba",productController.mostrarProductos)

module.exports = router