const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    bodega:{
        type: String,
        required: [true, 'Es obligatorio agregar la bodega']
    },
    cantidad:{
        type: Number,
        default: 0
    },
    estado:{
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

ProductoSchema.methods.toJSON = function(){
    const { __v, ...usuario} = this.toObject();
    return usuario;

} 

module.exports = model('Producto', ProductoSchema )