const Genero = require('../models/genero')

const validarNombreGeneroUnico = async (req, res, next) => {
    try {
        // Normaliza nombre si viene en el payload
        const tienePropNombre = Object.prototype.hasOwnProperty.call(req.body || {}, 'nombre')
        if (!tienePropNombre) {
            // No se valida si no se intenta cambiar/crear nombre; el controller decide si es requerido
            return next()
        }

        const rawNombre = typeof req.body.nombre === 'string' ? req.body.nombre : ''
        const nombreLimpio = rawNombre.trim()
        req.body.nombre = nombreLimpio

        // Si viene vacío, deja que el controller aplique su validación de requerido
        if (!nombreLimpio) {
            return next()
        }

        const id = req.params && req.params.id ? req.params.id : null
        const filtro = id ? { nombre: nombreLimpio, _id: { $ne: id } } : { nombre: nombreLimpio }
        const existente = await Genero.findOne(filtro)
        if (existente) {
            return res.status(400).json({ msj: 'Genero ya existe' })
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

module.exports = { validarNombreGeneroUnico }

const requerirNombreGenero = (req, res, next) => {
    const rawNombre = req.body && typeof req.body.nombre === 'string' ? req.body.nombre : ''
    const nombreLimpio = rawNombre.trim()
    req.body.nombre = nombreLimpio
    if (!nombreLimpio) {
        return res.status(400).json({ msj: 'El nombre es requerido' })
    }
    next()
}

module.exports = { validarNombreGeneroUnico, requerirNombreGenero }


