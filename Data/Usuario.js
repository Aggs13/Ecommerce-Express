class Usuario {
    constructor(nombre, apellido, email, password) {
        this.id = Date.now();
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
    }
}
module.exports = Usuario;