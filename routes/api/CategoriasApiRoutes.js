const express = require("express")
const router = express.Router()

const CategoriesApiController = require("../../controller/Api/CategoriesApiController")

router.get("/", CategoriesApiController.list)
router.get("/:id",CategoriesApiController.getById)

router.post("/", CategoriesApiController.crear)

router.delete("/:id", CategoriesApiController.eliminar)
router.put("/:id", CategoriesApiController.editar)


module.exports = router