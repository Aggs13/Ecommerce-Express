const express = require("express")
const router = express.Router()
const usuarioController = require("../controller/usuarioController")


router.post("/registro",usuarioController.Registro)
router.post("/login",usuarioController.login)
module.exports = router
