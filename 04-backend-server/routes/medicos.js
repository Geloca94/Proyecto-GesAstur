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
    getPaciente,
    crearPaciente,
    borrarPaciente,
    getMedicoById,
    actualizarPaciente,
} = require('../controllers/medicos')

const router = Router();

//EL ORDEN AFECTA A LAS RUTAS!!!

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


router.post('/registrarPaciente',
    [
        validarJWT,
        check('nombre', 'El nombre del Paciente es necesario').not().isEmpty(),
        validarCampos
    ],
    crearPaciente
);

router.get('/listaPaciente', validarJWT, getPaciente
);

router.put('/actualizarPaciente/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del Paciente es necesario').not().isEmpty(),
        check('medico', 'El medico Id debe ser valido').isMongoId(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarPaciente
);

router.delete('/listaPaciente/:id',
    validarJWT,
    borrarPaciente

);

router.get('/:id',
    validarJWT,
    getMedicoById
);

module.exports = router;