const express = require("express")
const router = express.Router()
const usuarioController = require("../controller/usuarioController")

router.get("/", (req, res) => {
  res.render("Login", { layout: false })
})

router.get("/Registrarse", (req, res) => {
  res.render("Registrar", { layout: false })
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


router.post("/ValidarUsuario",usuarioController.ValidarUsuario)
router.post("/RegistroUsuario",usuarioController.Registro)

module.exports = router
