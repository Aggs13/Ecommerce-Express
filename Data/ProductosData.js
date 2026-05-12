const Producto = require("../models/Producto")

const productos = [
    new Producto(
        1,
        "Coca Cola Lata",
        "Bebida gaseosa cola clásica ideal para compartir bien fría.",
        4200,
        "https://media.istockphoto.com/id/458464735/es/foto/coca-cola.jpg?s=612x612&w=0&k=20&c=SnB7NqAiTxs3PQzWpSpwOiOncP1hbYHEP9zaDurvLwU=",
        "Snacks",
        5
    ),
    new Producto(
        2,
        "Pepsi Black Lata",
        "Gaseosa cola sin azúcar con sabor intenso y refrescante.",
        3900,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX3l12WCOHIQ_OeRSIkZC_0P9IIwGvX_aoYQ&s",
        "Snacks",
        5
    ),
    new Producto(
        3,
        "Papas Lays Clásicas 150g",
        "Papas fritas crocantes sabor original.",
        2800,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRysHhI4qJ_1JBbdpLIA_i4Ouiar2u5ROWsmw&s",
        "Snacks",
        5
    ),
    new Producto(
        4,
        "Doritos Queso 140g",
        "Nachos sabor queso con textura súper crocante.",
        3100,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOkF4OntxglFuOORBCGdx4Fo24G6AiSgMtNA&s",
        "Snacks",
        5
    ),
    new Producto(
        5,
        "Chocolate Milka Oreo 100g",
        "Chocolate con leche y trozos de galletita Oreo.",
        2200,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4f2vGP4iG9bFlnpsqMA2LWSQdV-0XP4i5aQ&s",
        "Snacks",
        5
    ),
    new Producto(
        6,
        "Galletas Oreo 118g",
        "Galletitas de chocolate con relleno sabor vainilla.",
        1700,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsRWKEn3SK8-am8v0Tcns6984Z1R5lZnAytg&s",
        "Snacks",
        5
    ),
    new Producto(
        7,
        "Rocklets 40g",
        "Confites de chocolate con cobertura crocante y colores divertidos.",
        1200,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShxHHLuLv0SlVgmCrZklfQAIV_CjJC-afaFw&s",
        "Snacks",
        5
    ),
    new Producto(
        8,
        "Kinder Bueno",
        "Barra wafer rellena con crema de avellanas y cubierta de chocolate.",
        2500,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx5PpNPfHJwttX75eAdp6zuRCcYw-lgnSGnw&s",
        "Snacks",
        5
    ),
    new Producto(
        9,
        "Monster Energy 473ml",
        "Bebida energizante sabor original.",
        3600,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX2JN2f94dLPCWlQwvMrPaKuAUbCHJqIzyEA&s",
        "Snacks",
        5
    ),
    new Producto(

        10,
        "Maní Salado 200g",
        "Maní tostado y salado ideal para picadas y snacks.",
        1900,
        "https://acdn-us.mitiendanube.com/stores/001/129/542/products/mani-salado1-52406cda54243bf51a15850639045132-1024-1024.webp",
        "Snacks",
        5
    ),
    new Producto(
        11,
        "Palitos Salados 120g",
        "Snack salado crocante perfecto para acompañar dips.",
        1400,
        "https://acdn-us.mitiendanube.com/stores/001/157/846/products/diseno-sin-titulo-16-5b05628a064d5e4ff717443136166002-640-0.webp",
        "Snacks",
        5
    )
];

module.exports = productos;