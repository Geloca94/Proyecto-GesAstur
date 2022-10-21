const { Schema, model } = require('mongoose');
const { collection } = require('./administrador');

const HospitalSchema = Schema({

    nombre: {
        type: String,
        require: true

    },
    img: {
        type: String,
    },
    administrador: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Administrador'
    }
}, { collection: 'hospitales' });

HospitalSchema.method('toJSON', function () {

    const { __v, ...object } = this.toObject();


    return object;
})

module.exports = model('Hospital', HospitalSchema);