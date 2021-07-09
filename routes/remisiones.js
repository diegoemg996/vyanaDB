const { Router } = require('express');
const { check } = require('express-validator');
const { crearRemision } = require('../controllers/remision');
const router = Router();




router.post('/', [

], crearRemision );



module.exports = router;