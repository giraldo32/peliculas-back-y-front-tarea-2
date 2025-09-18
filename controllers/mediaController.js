const Media = require('../models/media')
const { request, response } = require('express')

const createMedia = async (req = request, res = response) => {
    try {
        const { nombre, estado } = req.body;
        const datos = { nombre, estado };
        const media = new Media(datos);
        await media.save();
        res.status(201).json(media);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msj: 'Error en el servidor' });
    }
}

const getMedias = async (req = request, res = response) => {
    try{
        const medias = await Media.find()
        return res.json(medias)
    }catch (error) {
        console.log(error) 
        return res.status(500).json({ msj: 'Error en el servidor' })    
    }
}

const getMediasByEstado = async (req = request, res = response) => {
    try{
        const { estado } = req.query
        const estadoBoolean = estado === 'true'
        const medias = await Media.find({ estado: estadoBoolean })
        return res.json(medias)
    }catch (error) {
        console.log(error) 
        return res.status(500).json({ msj: 'Error en el servidor' })    
    }
}

const updateMedia = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, estado } = req.body;
        const datos = { nombre, estado, fechaActualizacion: new Date() };
        const mediaActualizada = await Media.findByIdAndUpdate(id, datos, { new: true });
        if (!mediaActualizada) {
            return res.status(404).json({ msj: 'Media no encontrada' });
        }
        return res.json(mediaActualizada);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msj: 'Error en el servidor' });
    }
};

const deleteMedia = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const mediaEliminada = await Media.findByIdAndDelete(id);
        if (!mediaEliminada) {
            return res.status(404).json({ msj: 'Media no encontrada' });
        }
        return res.json({ msj: 'Media eliminada correctamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msj: 'Error en el servidor' });
    }
};

module.exports = { createMedia, getMedias, getMediasByEstado, updateMedia, deleteMedia }
