const express = require("express")
const router = express.Router()
const carritoController = require("../controller/CarritoController")


// GET
router.get("/Carrito", carritoController.RenderCarritoTotal)
router.get("/Checkout", carritoController.RenderCheckout)


// POST 
router.post("/agregar-carrito/:id", carritoController.AgregarCarro)
router.post("/sacar-carrito/:id",carritoController.sacarCarrito)
router.post("/sumar-carrito/:id", carritoController.SumarCarro)
router.post("/restar-carrito/:id", carritoController.RestarCarro)

module.exports = router
