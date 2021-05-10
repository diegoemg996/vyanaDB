const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req, res = response, next) =>{

    const token = req.header('authorization');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
    
        const {uid} = jwt.verify(token, process.env.SECRETKEY);

        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'Usuario no existe DB'
            })
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Usuario dado de baja'
            })
        }

        req.usuario = usuario;
        
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }



}

module.exports = {
    validarJWT
}