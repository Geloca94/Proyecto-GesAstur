
//Este busca si existe  y funciones de borrar
const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const actualizarImagen = async (tipo, id, nombreArchivo) => {

    switch (tipo) {
        case 'medcos':
            const medico = Medico.findById(id);
            if (!medico) {
                console.log('No se encontro el medico por id')
                return false;
            }
            //EL PATH VIEJO 
            const pathViejo = `./uploads/medicos/${medico.img}`;

            //Borrar imagen
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            medico.img = nombreArchivo;
            await medico.save();
            return true;

            break;
        case 'hospitales':

            break;
        case 'usuarios':

            break;
    }

}


module.exports = {
    actualizarImagen,
}