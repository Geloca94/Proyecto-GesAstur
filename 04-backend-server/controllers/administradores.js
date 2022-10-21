const { response } = require('express');
const bcrypt = require('bcrypt');


const Administrador = require('../models/administrador');
const { generarJWT } = require('../helpers/jwt');


const getAdministradors = async (req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [administradores, total] = await Promise.all([
        Administrador
            .find({}, 'nombre email role google img')
            .skip(desde)
            .limit(5),

        Administrador.countDocuments()
    ])

    res.json({
        ok: true,
        administradores,
        total,

    });
}

const crearAdministrador = async (req, res = response) => {

    const { email, password } = req.body;



    try {
        const existeEmail = await Administrador.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const administrador = new Administrador(req.body);

        //Encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        administrador.password = bcrypt.hashSync(password, salt);


        //Guardar Administrador
        await administrador.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT(administrador.id);

        res.json({
            ok: true,
            administrador,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.. revisar logs'
        });

    }


}

const actualizarAdministrador = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el administrador correcto

    const uid = req.params.id;


    try {

        const administradorDB = await Administrador.findById(uid);

        if (!administradorDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un administrador por ese id'
            });
        }

        //Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if (administradorDB.email !== email) {

            const existeEmail = await Administrador.findOne({ email })
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un administrador con ese email'
                });
            }
        }

        campos.email = email;


        const administradorActualizado = await Administrador.findOneAndUpdate(uid, campos, { new: true });


        res.json({
            ok: true,
            administrador: administradorActualizado
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const borrarAdministrador = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const administradorDB = await Administrador.findById(uid);

        if (!administradorDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un administrador por ese id'
            });
        }

        await Administrador.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Administrador eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


module.exports = {
    getAdministradors,
    crearAdministrador,
    actualizarAdministrador,
    borrarAdministrador,


}
