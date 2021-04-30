const { response, request } = require('express');
const Producto = require('../models/producto');

const obtenerProductos = async(req, res = response)=>{
   
    const [total, productos] = await Promise.all([
        Producto.count({estado: true}),
        Producto.find({estado: true})
            .populate('usuario', 'nombre')
           
    ])

    res.json({
        total,
        productos
    })
}


const obtenerProducto = async(req, res = response)=>{
    const {id} = req.params;

    const producto = await Producto.findById(id);

    res.json(producto)
}

const crearProducto = async(req, res = response) => {

    const bodegaValida = ['Rio Alamo', 'Vitaminas'];

    const {estado, ...body} = req.body;

    if(!bodegaValida.includes( body.bodega)){
        return res.status(401).json({
            msg: `Bodega no valida. Las bodegas deben de ser ${bodegaValida}`
        })
    }

    // Generar la data a guardar
    const data = {
        ...body,
        usuario: req.usuario._id
    }

    const producto = new Producto( data );

    await producto.save();

    res.status(201).json(producto);


}

const actualizarProducto = async(req, res = response) => {

    const {id} = req.params;

    const actualizado = await Producto.findByIdAndUpdate(id, req.body, {new:true});

    res.json({
        actualizado
    })

}

const borrarProducto = async(req, res = response) => {

    const {id} = req.params;

    const borrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new:true});

    res.json({
        borrado
    })

}

module.exports = {
    actualizarProducto,
    crearProducto,
    borrarProducto,
    obtenerProductos,
    obtenerProducto
}