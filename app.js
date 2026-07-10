require("dotenv").config()

const express = require("express")
const cors = require("cors")

const app = express()

// Middlewares generales
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json())

// Montar rutas bajo /api
app.use("/api/productos", require("./routes/productRoute"))
app.use("/api/carrito", require("./routes/carritoRoute"))
app.use("/api/usuarios", require("./routes/usuarioRoute"))

// Middleware de errores global (devuelve JSON)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: "Error interno del servidor" })
})

app.listen(3000, () => {
  console.log("API en http://localhost:3000/")
})