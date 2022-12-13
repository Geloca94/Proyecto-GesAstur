/**
    Citas
    ruta: /api/hospitales
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getCitas,
    crearCita,
    //actualizarHospital,
    borrarCita
} = require('../controllers/citas')

const router = Router();

router.get('/', getCitas);

router.post('/',
    [
        validarJWT,
        check('descripcion', 'La descripcion es necesaria').not().isEmpty(),
        check('paciente', 'El paciente id debe ser valido').isMongoId(),
        check('medico', 'El medico id debe ser valido').isMongoId(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    crearCita
);

router.put('/:id',
    [
        validarJWT,

        validarCampos

    ],
    //actualizarHospital
);


router.delete('/:id',
    validarJWT,
    borrarCita
);


module.exports = router;