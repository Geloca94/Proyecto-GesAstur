
const { response } = require('express');

const Incidencia = require('../models/incidencia');

const getIncidencia = async (req, res = response) => {
    const incidencias = await Incidencia.find()
        .populate('administrador', 'nombre');

    res.json({
        ok: true,
        incidencias,

    })
}

const crearIncidencia = async (req, res = response) => {

    const uid = req.uid;
    const incidencia = new Incidencia({
        administrador: uid,
        ...req.body
    });


    try {

        const incidenciaDB = await incidencia.save();
        res.json({
            ok: true,
            incidencia: incidenciaDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al enviar la incidencia"
        })

    }

}

const borrarIncidencia = async (req, res = response) => {
    const id = req.params.id
    try {

        const incidencia = await Incidencia.findById(id);

        if (!incidencia) {
            return res.status(400).json({
                ok: true,
                msg: 'Incidencia no encontrada',
            });
        }

        await Incidencia.findByIdAndDelete(id)



        res.json({
            ok: true,
            msg: 'Incidencia Resuelta'
        })
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const getIncidenciaById = async (req, res = response) => {

    const id = req.params.id;
    try {

        const incidencia = await Incidencia.findById(id)
            .populate('administrador', 'nombre');


        res.json({
            ok: true,
            incidencia,

        })
    } catch (error) {
        console.log(error);

        res.json({
            ok: true,
            msg: 'Incidencia no encontrada',

        })

    }
}

module.exports = {
    getIncidencia,
    crearIncidencia,
    borrarIncidencia,
    getIncidenciaById
}