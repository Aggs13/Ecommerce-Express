const express = require("express")
const router = express.Router()
const productController = require("../controller/productController")

router.get("/inicio", productController.mostrarProductosIncio)
router.get("/Detalles/:id", productController.productoDetalles)
router.get("/Categorias",productController.mostrarPorCategoria)
router.get("/buscar", productController.buscarProductos)
router.get("/Productos", productController.mostrarTodosProductos)
module.exports = router
