const {Schema, model} = require('mongoose');

const ClienteSchema = Schema({
    codigo:{
        type: String,
    },
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    zona:{
        type: String
    },
    estado:{
        type: String
    }

})

module.exports = model('Cliente', ClienteSchema )