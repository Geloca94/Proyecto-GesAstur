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
    getPaciente,
    getMedicoById
} = require('../controllers/medicos')

const router = Router();

router.get('/', validarJWT, getMedico);

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
    validarJWT,
    borrarMedico
);

router.get('/:id',
    validarJWT,
    getMedicoById
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