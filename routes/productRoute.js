const express = require("express")
const router = express.Router()
const productController = require("../controller/productController")


router.get("/", productController.listar)

router.get("/:id", productController.detalle)


module.exports = router
