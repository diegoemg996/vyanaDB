const {Schema, model} = require('mongoose');

const RemisionSchema = Schema({

    numeroRemision:{
        type: String,
        require: [true, "El numero de remisión es obligatorio"]
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    entradas:{
        type: Array
    },
    subtotal:{
        type: Number,
        default: 0
    },
    total:{
        type: Number,
        default: 0
    }

})

module.exports = model('Remision', RemisionSchema )
