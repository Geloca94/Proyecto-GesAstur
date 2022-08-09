const { response } = require('express');
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');

const login = async (req, res = response) => {

    const { email, password } = req.body;


    try {
        //Verificar Email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            });
        }

        //verificar Constraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no Valida'
            });
        }

        //Generar el TOKEN - JWT


        res.json({
            ok: true,
            msg: 'Hola Mundo'
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }

}

module.exports = {
    login
}