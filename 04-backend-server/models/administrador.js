const { Schema, model } = require('mongoose');

const AdministradorSchema = Schema({

    nombre: {
        type: String,
        require: true

    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,

    },
    google: {
        type: Boolean,
        default: false

    },
}, { collection: 'administradores' });

AdministradorSchema.method('toJSON', function () {

    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;

    return object;
})

module.exports = model('Administrador', AdministradorSchema);