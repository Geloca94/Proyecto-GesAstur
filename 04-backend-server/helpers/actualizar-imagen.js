
//Este busca si existe  y funciones de borrar
const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = (path) => {


    //Borrar imagen
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }

}

const actualizarImagen = async (tipo, id, nombreArchivo) => {

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No se encontro el medico')
                return false;
            }

            //EL PATH VIEJO 
            const pathViejoMedico = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejoMedico);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

            break;
        case 'hospitales':

            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No se encontro el Hospital')
                return false;
            }

            //EL PATH VIEJO 
            const pathViejoHospital = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejoHospital);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

            break;
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No se encontro el Usuario')
                return false;
            }

            //EL PATH VIEJO 
            const pathViejoUsuario = `./uploads/hospitales/${usuario.img}`;
            borrarImagen(pathViejoUsuario);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;
    }

}


module.exports = {
    actualizarImagen,
}