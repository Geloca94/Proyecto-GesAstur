
/*
Ruta: /api/administrador
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getIncidencia, crearIncidencia, borrarIncidencia } = require('../controllers/incidencias');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getIncidencia);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre de la incidencia es obligatorio').not().isEmpty(),
        check('tipo', 'El tipo de la incidencia es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion de la incidencia es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearIncidencia
);


router.delete('/:id',
    validarJWT,
    borrarIncidencia
);


module.exports = router;