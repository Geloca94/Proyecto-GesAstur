const { Schema, model, SchemaType } = require('mongoose');
const hospital = require('./hospital');
const medico = require('./medico');
const paciente = reqire('./paciente');
const { collection } = require('./administrador');

const CitaSchema = Schema({


    medico: {
        type: Schema.Types.ObjectId,
        ref: 'Medico',
        required: true
    },
    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'paciente',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
    },
    dia: {
        type: Number,
        require: true

    },
    descripcion: {
        type: String,
        require: true
    },

}, { collection: 'citas' });

CitaSchema.method('toJSON', function () {

    const { __v, ...object } = this.toObject();

    return object;
})

module.exports = model('Cita', CitaSchema);