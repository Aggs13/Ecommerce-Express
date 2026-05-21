const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./dataBase/ecommerce.db", (err) => {
    if (err) {
        console.error("Error al conectar con SQLite:", err.message)
        return
    }
    console.log("Conectado a SQLite")
    
})



module.exports = db
