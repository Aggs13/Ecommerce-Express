class Carrito {

    constructor(idUsuario) {
        this.idUsuario = idUsuario;
        this.productos = [];

    }
}

const listaCarritos = []
module.exports = {Carrito, listaCarritos};