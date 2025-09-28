const { Schema, model } = require('mongoose');

const MediaSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'],
        unique: true
    },
    sinopsis: {
        type: String,
        required: [true, 'La sinopsis es obligatoria']
    },
    url: {
        type: String,
        required: [true, 'La URL es obligatoria'],
        unique: true
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
    },
    url: {
        type: String,
        required: [true, 'La URL es obligatoria'],
        unique: true
    }
});

module.exports = model('Media', MediaSchema);