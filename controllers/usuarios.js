const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');




const usuariosGet = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};
 

    const [total, usuarios] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
    ])

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //encriptar password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        msg: 'post API - usuariosPost',
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - usuariosPut',
        usuario
    })

}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        usuario
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}