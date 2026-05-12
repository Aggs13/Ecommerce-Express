const Usuario = require("./Usuario");
class ControladorUsuario {
    constructor() {
        this.usuarios = [];
    }

    agregarUsuario(nombre, apellido, email, password) {
        const nuevoUsuario = new Usuario(nombre, apellido, email, password);
        this.usuarios.push(nuevoUsuario);
    }

    obtenerUsuarios() {
        return this.usuarios;
    }
    
    validarUsuario(email, password) {
        return this.usuarios.find(
            u => u.email === email && u.password === password
        )   
    }



}
module.exports = new ControladorUsuario();