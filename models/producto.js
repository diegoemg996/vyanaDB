const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    codigo:{
        type: String,
    },
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    linea:{
        type:String
    },
    bodega:{
        type: String
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