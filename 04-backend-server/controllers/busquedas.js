

const { response } = require('express');

const Administrador = require('../models/administrador');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const hospital = require('../models/hospital');
// getTodo


const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');



    const [administradores, medicos, hospitales] = await Promise.all([
        Administrador.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })

    ])

    res.json({
        ok: true,
        administradores,
        medicos,
        hospitales
    })

}

const getDocumentosColeccion = async (req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];
    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('administrador', 'nombre img')
                .populate('hospital', 'nombre img');
            break;
        case 'hospitales':

            data = await Hospital.find({ nombre: regex })
                .populate('administrador', 'nombre img');

            break;
        case 'administradores':

            data = await Administrador.find({ nombre: regex });

            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'Esa tabla no existe'
            })


    }


    res.json({
        ok: true,
        resultados: data
    })

}

module.exports = {
    getTodo,
    getDocumentosColeccion
}
