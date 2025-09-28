const { Schema, model } = require('mongoose');

const MediaSchema = Schema({
    nombre: {                    // ← CAMBIAR de 'titulo' a 'nombre'
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    sinopsis: {
        type: String,
        required: [true, 'La sinopsis es obligatoria']
    },
    url: {
        type: String,
        required: [true, 'La URL es obligatoria']
    },
    anioEstreno: {
        type: Number,
        required: [true, 'El año de estreno es obligatorio']
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
    }
});

module.exports = model('Media', MediaSchema);