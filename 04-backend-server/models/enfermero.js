const { Schema, model } = require('mongoose');
const hospital = require('./hospital');
const { collection } = require('./administrador');

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
    administrador: {
        type: Schema.Types.ObjectId,
        ref: 'Administrador',
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