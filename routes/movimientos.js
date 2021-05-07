const { Router } = require('express');
const { check } = require('express-validator');
const {entradaProducto} = require('../controllers/movimientos')

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post('/agregar/:id',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('cantidad', 'La cantidad es obligatoria').not().isEmpty(),
    check('usuario', 'El usuario es obligatorio es obligatoria').not().isEmpty(),
    check('tipo', 'El tipo es obligatorio').not().isEmpty(),
    validarCampos
],entradaProducto);



module.exports = router;