/**
    AuxiliarEnfermeros
    ruta: /api/auxEnfermeros
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getAuxiliar,
    crearAuxiliar,
    actualizarAuxiliar,
    borrarAuxiliar
} = require('../controllers/auxiliar')

const router = Router();

router.get('/', getAuxiliar);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del Auxiliar es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    crearAuxiliar
);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del Auxiliar es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarAuxiliar
);


router.delete('/:id',

    borrarAuxiliar

);


module.exports = router;