const { response } = require('express');
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

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
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }

}
const googleSingIn = async (req, res = response) => {

    res.json({
        ok: true,
        msg: req.body.token
    });

}
//Renovar Token
const renewToken = async (req, res = response) => {

    const uid = req.uid;

    //Generar el Token -JWT
    const token = await generarJWT(uid);
    res.json({
        ok: true,
        token
    })
}

module.exports = {
    login,
    googleSingIn,
    renewToken
}