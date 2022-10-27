const { Schema, model, SchemaType } = require('mongoose');
const hospital = require('./hospital');
const medico = require('./medico');
const { collection } = require('./administrador');

const PacienteSchema = Schema({

    nombre: {
        type: String,
        require: true

    },
    medico: {
        type: Schema.Types.ObjectId,
        ref: 'Medico',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
    }


}, { collection: 'pacientes' });

PacienteSchema.method('toJSON', function () {

    const { __v, ...object } = this.toObject();

    return object;
})

module.exports = model('Paciente', PacienteSchema);