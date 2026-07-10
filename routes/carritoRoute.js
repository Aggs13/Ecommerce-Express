const express = require("express")
const router = express.Router()
const carritoController = require("../controller/CarritoController")
const { authenticateToken } = require("../middleware/authMiddleware");

router.use(authenticateToken) // Middleware para autenticar el token antes de las rutas del carrito

router.get("/", carritoController.obtener)

router.post("/productos/:id",carritoController.agregar)

router.delete("/productos/:id", carritoController.eliminar)

router.patch("/productos/:id/sumar", carritoController.sumar)

router.patch("/productos/:id/restar", carritoController.restar)

module.exports = router
