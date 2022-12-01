
//Este busca si existe  y funciones de borrar
const fs = require('fs');

const Administrador = require('../models/administrador');
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

        case 'administradores':

            const administrador = await Administrador.findById(id);

            //console.log(administrador)
            if (!administrador) {
                console.log('No se encontro el Administrador')
                return false;
            }
            //EL PATH VIEJO 
            const pathViejoAdministrador = `./uploads/administradores/${administrador.img}`;

            //console.log(pathViejoAdministrador);

            if (fs.existsSync(pathViejoAdministrador)) {

                //fs.unlinkSync(pathViejoAdministrador);
            }

            administrador.img = nombreArchivo;

            //console.log(administrador.img);
            await administrador.save();
            return true;

            break;


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

    }

}


module.exports = {
    actualizarImagen,
}