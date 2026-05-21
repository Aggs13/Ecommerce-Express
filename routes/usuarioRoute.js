const express = require("express")
const router = express.Router()
const usuarioController = require("../controller/usuarioController")

router.get("/", (req, res) => {
  res.render("Login", { layout: false,mensaje:null })
})

router.get("/Registrarse", (req, res) => {
  res.render("Registrar", { layout: false,mensaje:null })
})

router.get("/Usuario", (req, res) => {
  if (!req.session.usuario) {
    return res.redirect("/")
  }

  res.render("Usuario", {
    titulo: req.session.usuario.nombre,
    page: "inicio"
  })
})


router.post("/RegistroUsuario",usuarioController.Registro)
router.post("/ValidarUsuario",usuarioController.IniciarSesion)
module.exports = router
