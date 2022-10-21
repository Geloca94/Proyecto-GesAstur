/**
    Medicos
    ruta: /api/medicos
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    crearPaciente,
    getPaciente
} = require('../controllers/medicos')

const router = Router();

router.get('/', getMedico);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del Medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del Medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarMedico
);


router.delete('/:id',

    borrarMedico
);

router.post('/registrarPaciente',
    [
        validarJWT,
        check('nombre', 'El nombre del Paciente es necesario').not().isEmpty(),
        validarCampos
    ],
    crearPaciente
);
router.get('/listaPaciente', getPaciente
);


module.exports = router;