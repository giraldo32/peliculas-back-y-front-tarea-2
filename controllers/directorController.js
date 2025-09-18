const Director = require('../models/director')
const { request, response } = require('express')

const createDirector = async (req = request, res = response) => {
    try {
        const { nombres } = req.body
        const datos = { nombres }

        const director = new Director(datos)
        await director.save()
        res.status(201).json(director)    
    } catch (error) {
        console.log(error) 
        return res.status(500).json({ msj: 'Error en el servidor' })    
    }
}

const getDirectores = async (req = request, res = response) => {
    try{
        const directores = await Director.find()
        return res.json(directores)
    }catch (error) {
        console.log(error) 
        return res.status(500).json({ msj: 'Error en el servidor' })    
    }
}

const getDirectoresByEstado = async (req = request, res = response) => {
    try{
        const { estado } = req.query
        // Convertir string a boolean
        const estadoBoolean = estado === 'true'
        
        const directores = await Director.find({ estado: estadoBoolean })
        return res.json(directores)
    }catch (error) {
        console.log(error) 
        return res.status(500).json({ msj: 'Error en el servidor' })    
    }
}

const updateDirector = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const { nombres } = req.body
        const datos = { 
            nombres,
            fechaActualizacion: new Date()
        }
        const directorActualizado = await Director.findByIdAndUpdate(id, datos, { new: true })
        if(!directorActualizado) {
            return res.status(404).json({ msj: 'Director no encontrado' })
        }
        return res.json(directorActualizado)
    } catch (error) {
        console.log(error) 
        return res.status(500).json({ msj: 'Error en el servidor' })    
    }
}

const deleteDirector = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const directorEliminado = await Director.findByIdAndDelete(id);
        if (!directorEliminado) {
            return res.status(404).json({ msj: 'Director no encontrado' });
        }
        return res.json({ msj: 'Director eliminado correctamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msj: 'Error en el servidor' });
    }
};

module.exports = {
    createDirector,
    getDirectores,
    getDirectoresByEstado,
    updateDirector,
    deleteDirector
};
