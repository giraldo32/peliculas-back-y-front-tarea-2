const { Schema, model } = require('mongoose')

const MediaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    },
    url: {
        type: String,
        required: [true, 'La URL es obligatoria'],
        unique: true
    },
    sinopsis: {
        type: String,
        required: [true, 'La sinopsis es obligatoria']
    },
    anioEstreno: {
        type: Number,
        required: [true, 'El año de estreno es obligatorio']
    }
})

module.exports = model('Media', MediaSchema)