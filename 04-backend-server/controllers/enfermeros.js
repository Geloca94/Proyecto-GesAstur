
const { response } = require('express');

const Enfermero = require('../models/enfermero');

const getEnfermero = async (req, res = response) => {
    const enfermeros = await Enfermero.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        enfermeros,

    })
}

const crearEnfermero = async (req, res = response) => {

    const uid = req.uid;
    const enfermero = new Enfermero({
        usuario: uid,
        ...req.body
    });


    try {

        const enfermeroDB = await enfermero.save();

        res.json({
            ok: true,
            enfermero: enfermeroDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })

    }

}

const actualizarEnfermero = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const enfermero = await Enfermero.findById(id);

        if (!enfermero) {
            return res.status(400).json({
                ok: true,
                msg: 'Enfermero no encontrado',
            });
        }

        const cambiosEnfermero = {
            ...req.body,
            usuario: uid
        }

        const enfermeroActualizado = await Enfermero.findByIdAndUpdate(id, cambiosEnfermero, { new: true })


        res.json({
            ok: true,
            enfermero: enfermeroActualizado
        })
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarEnfermero = async (req, res = response) => {
    const id = req.params.id
    try {

        const enfermero = await Enfermero.findById(id);

        if (!enfermero) {
            return res.status(400).json({
                ok: true,
                msg: 'Enfermero no encontrado',
            });
        }

        await Enfemero.findByIdAndDelete(id)



        res.json({
            ok: true,
            msg: 'Enfermero Eliminado'
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
    getEnfermero,
    crearEnfermero,
    actualizarEnfermero,
    borrarEnfermero
}