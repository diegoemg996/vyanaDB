const Producto = require('../models/producto');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}


//verificar si el correo existe
const emailExiste = async(correo = '')=>{
    const existeEmail = await Usuario.findOne({correo});

    if(existeEmail){
        throw new Error(`El email ${correo} ya esta registrado`)
    }
}

const existeUsuarioPorId = async(id)=>{
    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
        throw new Error(`El id no existe ${id}`)
    }
}

const existeProductoPorId = async(id)=>{
    const existeProducto = await Producto.findById(id);

    if(!existeProducto){
        throw new Error(`El producto no existe.`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeProductoPorId
}