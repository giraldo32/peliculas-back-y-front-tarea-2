const {Schema, model} = require('mongoose')


const DirectorSchema = Schema({
    nombres : {
        type: String,
        required: [true, 'Los nombres son obligatorios'],
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
    }
})


module.exports = model('Director', DirectorSchema)
