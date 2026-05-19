const express = require("express")
const router = express.Router()
const usuarioController = require("../controller/usuarioController")

router.get("/", (req, res) => {
  res.render("Login")
})

router.get("/Registrarse", (req, res) => {
  res.render("Registrar")
})


router.post("/ValidarUsuario",usuarioController.ValidarUsuario)
router.post("/RegistroUsuario",usuarioController.Registro)

module.exports = router