const Pelicula = require('../models/pelicula')

const validarNombrePeliculaUnico = async (req, res, next) => {
    try {
        const tienePropNombre = Object.prototype.hasOwnProperty.call(req.body || {}, 'nombre')
        if (!tienePropNombre) {
            return next()
        }
        const rawNombre = typeof req.body.nombre === 'string' ? req.body.nombre : ''
        const nombreLimpio = rawNombre.trim()
        req.body.nombre = nombreLimpio
        if (!nombreLimpio) {
            return next()
        }
        const id = req.params && req.params.id ? req.params.id : null
        const filtro = id ? { nombre: nombreLimpio, _id: { $ne: id } } : { nombre: nombreLimpio }
        const existente = await Pelicula.findOne(filtro)
        if (existente) {
            return res.status(400).json({ msj: 'Pelicula ya existe' })
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

module.exports = validarNombrePeliculaUnico;
