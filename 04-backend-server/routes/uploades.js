/*
    ruta: api/uploads/
*/
const { Router } = require('express');
const expressFileUploades = require('express-fileupload');


const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload } = require('../controllers/uploads');



const router = Router();

router.use(expressFileUploades());

router.put('/:tipo/:id', validarJWT, fileUpload);



module.exports = router;

