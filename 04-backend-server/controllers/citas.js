
const { response } = require('express');
const Cita = require('../models/cita');
const Hospital = require('../models/hospital');
const Paciente = require('../models/paciente');
const Medico = require('../models/medico');

const getCitas = async (req, res = response) => {

    const citas = await Cita.find()
        .populate('medico', 'nombre')
        .populate('hospital', 'nombre')
        .populate('paciente', 'nombre');

    res.json({
        ok: true,
        citas
    })
}

const crearCita = async (req, res = response) => {

    //Uid administador
    //const uid = req.uid;
    const cita = new Cita({ ...req.body });


    //console.log(administrador);

    try {

        const citaDB = await cita.save();
        res.json({
            ok: true,
            cita: citaDB
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }


}
/*
const actualizarHospital = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(400).json({
                ok: true,
                msg: 'Hospital no encontrado',
            });
        }

        const cambiosHospital = {
            ...req.body,
            administrador: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true })


        res.json({
            ok: true,
            hospital: hospitalActualizado
        })
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
*/
const borrarCita = async (req, res = response) => {
    const id = req.params.id
    try {

        const cita = await Cita.findById(id);

        if (!cita) {
            return res.status(400).json({
                ok: true,
                msg: 'Cita no encontrada',
            });
        }

        await Cita.findByIdAndDelete(id)



        res.json({
            ok: true,
            msg: 'Cita Eliminada'
        })
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getCitas,
    crearCita,
    //actualizarHospital,
    borrarCita
}