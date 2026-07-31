const productService = require ("../../services/productsService")

const productsApiController = {
    list : async (req, res) => {
        const products = await productService.getAll()
        res.json(products)
    },

    detail: async (req, res) => {
        const product = await productService.getById(req.params.id)
        if(!product){
            return res.status(404).json({error:"Producto no encontrado"})
        }
        res.json(product)
    },
    
    create: async (req,res) => {
        const {nombre, descripcion, precio, stock, categoria, img} = req.body
        if(!nombre || !descripcion || !precio || !stock || !categoria){
            return res.status(400).json({error:"Faltan campos obligatorios"})
        }
        const nuevo = await productService.create({nombre, descripcion, precio, stock, categoria, img})
        res.status(201).json(nuevo)
    },

    update: async(req,res) => {
        const product = await productService.getById(req.params.id)
        if(!product){
            return res.status(404).json({error:"Producto no encontrado"})
        }

        await productService.update(req.params.id, req.body)
        res.json({mensaje: "Producto Actualizado"})
    },

    delete: async (req,res) => {
        const result = await productService.delete(req.params.id)
        if(!result.deleted){
            return res.status(404).json({error: "Producto no encontrado"})
        }
        res.status(204).send()
    }
}

module.exports = productsApiController