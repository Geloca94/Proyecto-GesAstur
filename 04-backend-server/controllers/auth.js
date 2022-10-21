const { response } = require('express');
const bcrypt = require('bcrypt');

const Administrador = require('../models/administrador');
const Medico = require('../models/medico');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {


    const { email, password } = req.body;


    try {
        //Verificar Email
        const administradorDB = await Administrador.findOne({ email });

        if (!administradorDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            });
        }
        //verificar Constraseña
        const validPassword = bcrypt.compareSync(password, administradorDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no Valida'
            });
        }


        //Generar el TOKEN - JWT
        const token = await generarJWT(administradorDB.id);

        res.json({
            ok: true,
            msg: 'Logaste como Administrador',
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al Loguear'
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

    //Obtener el administrador por UID
    const administrador = await Administrador.findById(uid);
    res.json({
        ok: true,
        token,
        administrador
    })

}

module.exports = {
    login,
    googleSingIn,
    renewToken
}