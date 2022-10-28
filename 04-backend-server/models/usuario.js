const { Schema, model, SchemaType } = require('mongoose');
const hospital = require('./hospital');
const rol = require('./rol');
const { collection } = require('./administrador');

const UsuarioSchema = Schema({

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
    administrador: {
        type: Schema.Types.ObjectId,
        ref: 'Administrador',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    role: {
        type: String,
        required: true,
        default: '2',
    }

});

UsuarioSchema.method('toJSON', function () {

    const { __v, ...object } = this.toObject();

    return object;
})

module.exports = model('Usuario', UsuarioSchema);