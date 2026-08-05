require("dotenv").config()

const express = require("express")
const cors = require("cors")
const CategoriasApiRoutes = require("./routes/api/CategoriasApiRoutes")

const app = express()

// Middlewares generales
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(express.json())

// Montar rutas bajo /api
app.use("/api/productos", require("./routes/productRoute"))
app.use("/api/products", require("./routes/api/productsApiRoutes"))
app.use("/api/cart", require("./routes/carritoRoute"))
app.use("/api/users", require("./routes/usuarioRoute"))
app.use("/api/categorias", require("./routes/categoriaRoute"))
app.use("/api/categories", CategoriasApiRoutes)

// Rutas API REST nuevas
app.use("/api/stats", require("./routes/api/statsApiRoutes"))

// Middleware de errores global (devuelve JSON)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: `Error interno del servidor ERROR: ${err}` })
})

app.listen(3000, () => {
  console.log("API en http://localhost:3000/")
})
