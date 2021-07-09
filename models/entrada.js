const {Schema, model} = require('mongoose');

const EntradaSchema = Schema({
/*     cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    }, */
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    cantidad:{
        type: Number,
        required: [true, 'La cantidad es obligatoria']
    },
    precio:{
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    importe:{
        type: Number
    }

})


module.exports = model('Entrada', EntradaSchema )