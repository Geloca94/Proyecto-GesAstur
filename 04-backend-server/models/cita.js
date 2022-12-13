const { Schema, model, SchemaType } = require('mongoose');
const hospital = require('./hospital');
const medico = require('./medico');
const paciente = require('./paciente');
const { collection } = require('./administrador');

const CitaSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    medico: {
        type: Schema.Types.ObjectId,
        ref: 'Medico',
        required: true
    },
    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
    },
    fecha: {
        type: Date,
        require: true

    },
    descripcion: {
        type: String,
        require: true
    },
    asistencia: {
        type: Boolean,

    },

}, { collection: 'citas' });

CitaSchema.method('toJSON', function () {

    const { __v, ...object } = this.toObject();

    return object;
})

module.exports = model('Cita', CitaSchema);