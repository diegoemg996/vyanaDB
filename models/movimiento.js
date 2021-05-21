const {Schema, model} = require('mongoose');

const MovimientoSchema = Schema({
    producto:{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    cantidad:{
        type: Number,
        default: 0
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    tipo:{
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        default: Date.now
    }
})

MovimientoSchema.methods.toJSON = function(){
    const { __v, ...usuario} = this.toObject();
    return usuario;

} 

module.exports = model('Movimiento', MovimientoSchema )