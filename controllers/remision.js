const { response, request } = require('express');
const Entrada = require('../models/entrada');
const Producto = require('../models/producto');
const Remision = require('../models/remision');

const crearRemision = async(req, res = response) => {

    const {entradas, ...body} = req.body;

    let entradaPost = [];
    let suma = 0;

    entradas.forEach((element) => {
        let entrada =  new Entrada(element);
        entrada.importe = entrada.cantidad * entrada.precio
        entradaPost.push(entrada);
    });

    entradaPost.forEach((element)=>{
        suma = element.importe + suma;
    })

    const remision = new Remision({...body});
    remision.subtotal = suma;
    remision.total = suma + suma*0.16;
    remision.entradas = entradaPost;

    await remision.save();

    res.status(201).json({
        estatus: "ok",
        remision
    });



}

module.exports = {
    crearRemision
}