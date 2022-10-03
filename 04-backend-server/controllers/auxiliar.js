
const { response } = require('express');

const Auxiliar = require('../models/auxiliar');

const getAuxiliar = async (req, res = response) => {
    const auxiliar = await auxiliar.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        auxiliar,

    })
}

const crearAuxiliar = async (req, res = response) => {

    const uid = req.uid;
    const auxiliar = new Auxiliar({
        usuario: uid,
        ...req.body
    });


    try {

        const auxiliarDB = await auxiliar.save();

        res.json({
            ok: true,
            auxiliar: auxiliarDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })

    }

}

const actualizarAuxiliar = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const auxiliar = await Auxiliar.findById(id);

        if (!auxiliar) {
            return res.status(400).json({
                ok: true,
                msg: 'Auxiliar no encontrado',
            });
        }

        const cambiosAxuliar = {
            ...req.body,
            usuario: uid
        }

        const auxiliarActualizado = await Auxiliar.findByIdAndUpdate(id, cambiosAxuliar, { new: true })


        res.json({
            ok: true,
            auxiliar: auxiliarActualizado
        })
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarAuxiliar = async (req, res = response) => {
    const id = req.params.id
    try {

        const auxiliar = await Auxiliar.findById(id);

        if (!auxiliar) {
            return res.status(400).json({
                ok: true,
                msg: 'Auxiliar no encontrado',
            });
        }

        await Auxiliar.findByIdAndDelete(id)



        res.json({
            ok: true,
            msg: 'Auxiliar Eliminado'
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
    getAuxiliar,
    crearAuxiliar,
    actualizarAuxiliar,
    borrarAuxiliar
}