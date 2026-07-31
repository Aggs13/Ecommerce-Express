require("dotenv").config()

const express = require("express")
const cors = require("cors")

const app = express()

// Middlewares generales
app.use(cors({
  origin: [
    "http://localhost:3001",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(express.json())

// Montar rutas bajo /api
app.use("/api/productos", require("./routes/productRoute"))
//Ruta nueva
app.use("/api/products", require("./routes/api/productsApiRoutes"))
app.use("/api/carrito", require("./routes/carritoRoute"))
app.use("/api/usuarios", require("./routes/usuarioRoute"))
app.use("/api/categorias", require("./routes/categoriaRoute"))

// Middleware de errores global (devuelve JSON)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: `Error interno del servidor ERROR: ${err}` })
})

app.listen(3000, () => {
  console.log("API en http://localhost:3000/")
})