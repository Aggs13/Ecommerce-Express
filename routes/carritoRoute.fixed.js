const express = require("express")
const router = express.Router()
const carritoController = require("../controller/CarritoController")

router.get("/agregar-carrito/:id", carritoController.AgregarCarro)
router.get("/sumar-carrito/:id", carritoController.SumarCarro)
router.get("/restar-carrito/:id", carritoController.RestarCarro)
router.get("/Carrito", carritoController.RenderCarritoTotal)

module.exports = router
