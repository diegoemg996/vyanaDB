const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, actualizarProducto, borrarProducto, obtenerProductos, obtenerProducto } = require('../controllers/productos');
const { existeProductoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/', obtenerProductos);

router.get('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto)

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('bodega', 'La bodega es obligatoria').not().isEmpty(),
    validarCampos
], crearProducto );

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto );

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto );

module.exports = router;