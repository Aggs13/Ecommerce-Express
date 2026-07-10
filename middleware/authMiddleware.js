const jwt = require("jsonwebtoken")
const SECRET = process.env.JWT_SECRET

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1] // "Bearer TOKEN"

  if (!token) return res.status(401).json({ error: "Token requerido" })

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token inválido o expirado" })
    req.usuario = decoded // { id, email }
    next()
  })
}

module.exports = { authenticateToken, SECRET }