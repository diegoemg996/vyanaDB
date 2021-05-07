const { Router } = require('express');
const { check } = require('express-validator');
const {entradaProducto} = require('../controllers/movimientos')

const { validarCampos } = require('../middlewares/validar-campos');
/* const { validarJWT } = require('../middlewares/validar-jwt'); */

const router = Router();


router.post('/agregar/:id',[
    check('cantidad', 'La cantidad es obligatoria').not().isEmpty(),
    validarCampos
],entradaProducto);



module.exports = router;