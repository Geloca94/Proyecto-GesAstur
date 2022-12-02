const { Schema, model } = require('mongoose');
const { collection } = require('./administrador');

const IncidenciaSchema = Schema({

    nombre: {
        type: String,
        require: true
    },
    tipo: {
        type: String
    },
    descripcion: {
        type: String
    },
    estado: {
        type: String,
        default: 'Abierta',
    },
    fecha: {
        type: Date,
        default: Date.now
    },

    administrador: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Administrador'
    }
});

IncidenciaSchema.method('toJSON', function () {

    const { __v, ...object } = this.toObject();


    return object;
})

module.exports = model('Incidencia', IncidenciaSchema);