const { Schema, model } = require('mongoose');
const hospital = require('./hospital');
const { collection } = require('./usuario');

const EnfermeroSchema = Schema({

    nombre: {
        type: String,
        require: true

    },
    salario: {
        type: String,

    },
    observacion: {
        type: String,
    },
    especializacion: {
        type: String,
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }

});

EnfermeroSchema.method('toJSON', function () {

    const { __v, ...object } = this.toObject();

    return object;
})

module.exports = model('Enfermero', EnfermeroSchema);