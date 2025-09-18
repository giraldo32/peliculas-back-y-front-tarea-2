const {Schema, model} = require('mongoose')


const GeneroSchema = Schema({
    nombre : {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true    
    },
    estado : {
        type: Boolean,
        default: true,
        required: true
    },
    fechaCreacion : {
        type: Date,
        default: new Date()
    },
    fechaActualizacion : {
        type: Date,
        default: new Date() 
    },
    descripcion : {
        type: String
    }
})


module.exports = model('Genero', GeneroSchema)