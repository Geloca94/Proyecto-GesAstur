const { Schema, model } = require('mongoose');


const RolSchema = Schema({

    nombre: {
        type: String,
        require: true
    },
    rango: {
        type: String,
        require: true
    }

}, { collection: 'roles' });

RolSchema.method('toJSON', function () {

    const { __v, ...object } = this.toObject();


    return object;
})

module.exports = model('Rol', RolSchema);