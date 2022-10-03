/**
    Enfermeros
    ruta: /api/enfermeros
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getEnfermero,
    crearEnfermero,
    actualizarEnfermero,
    borrarEnfermero
} = require('../controllers/enfermeros')

const router = Router();

router.get('/', getEnfermero);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del Enfnermero es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    crearEnfermero
);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del Enfermero es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),
        validarCampos

    ],
    actualizarEnfermero
);


router.delete('/:id',

    borrarEnfermero
);


module.exports = router;