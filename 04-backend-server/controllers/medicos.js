
const { response } = require('express');

const Medico = require('../models/medico');
const Paciente = require('../models/paciente');

const getMedico = async (req, res = response) => {
    const medicos = await Medico.find()
        .populate('administrador', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos,

    })
}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        administrador: uid,
        ...req.body
    });


    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })

    }

}



const actualizarMedico = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(400).json({
                ok: true,
                msg: 'Medico no encontrado',
            });
        }

        const cambiosMedico = {
            ...req.body,
            administrador: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true })


        res.json({
            ok: true,
            medico: medicoActualizado
        })
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarMedico = async (req, res = response) => {
    const id = req.params.id
    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(400).json({
                ok: true,
                msg: 'Medico no encontrado',
            });
        }

        await Medico.findByIdAndDelete(id)



        res.json({
            ok: true,
            msg: 'Medico Eliminado'
        })
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const crearPaciente = async (req, res = response) => {
    const uid = req.uid;
    const paciente = new Paciente({
        medico: uid,
        ...req.body
    });


    try {

        const pacienteDB = await paciente.save();

        res.json({
            ok: true,
            paciente: pacienteDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })

    }
}

const getPaciente = async (req, res = response) => {
    const pacientes = await Paciente.find()
        .populate('medico', 'nombre')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        pacientes,

    })
}

const darCita = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const paciente = await Paciente.findById(id);

        if (!paciente) {
            return res.status(400).json({
                ok: true,
                msg: 'Paciente no encontrado',
            });
        }

        const crearCita = {
            ...req.body,
            administrador: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true })


        res.json({
            ok: true,
            medico: medicoActualizado
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
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    crearPaciente,
    getPaciente,

}