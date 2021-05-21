const { response } = require("express");
const Movimiento = require("../models/movimiento");
const Producto = require("../models/producto");

const obtenerMovimientos = async(req, res = response) =>{
    const movimientos = await Movimiento.find().populate('producto', 'nombre').populate('usuario', 'nombre');
                        
    res.json({
        movimientos
    })
}


const entradaProducto = async(req, res = response) =>{

    const {cantidad} = req.body;

    const {id} = req.params;

    await Producto.findOneAndUpdate({_id :id}, {$inc : {'cantidad' : cantidad}});

    const data = {
        producto: id,
        cantidad,
        tipo: cantidad > 0 ? "entrada" : "salida",
        usuario: req.usuario._id

    }

    const movimientos = new Movimiento( data );

    await movimientos.save();

    res.json({
        movimientos
    })
}

module.exports = {
    entradaProducto,
    obtenerMovimientos
}