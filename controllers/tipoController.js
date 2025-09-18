const Tipo = require('../models/tipo')
const { request, response } = require('express')

const createTipo = async (req = request, res = response) => {
    try {
        const { nombre } = req.body
        const datos = { nombre }

        const tipo = new Tipo(datos)
        await tipo.save()
        res.status(201).json(tipo)    
    } catch (error) {
        console.log(error) 
        return res.status(500).json({ msj: 'Error en el servidor' })    
    }
}

const getTipos = async (req = request, res = response) => {
    try{
        const tipos = await Tipo.find()
        return res.json(tipos)
    }catch (error) {
        console.log(error) 
        return res.status(500).json({ msj: 'Error en el servidor' })    
    }
}

const getTiposByEstado = async (req = request, res = response) => {
    try{
        const { estado } = req.query
        const estadoBoolean = estado === 'true'
        const tipos = await Tipo.find({ estado: estadoBoolean })
        return res.json(tipos)
    }catch (error) {
        console.log(error) 
        return res.status(500).json({ msj: 'Error en el servidor' })    
    }
}

const updateTipo = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const datos = { nombre, fechaActualizacion: new Date() };
        const tipoActualizado = await Tipo.findByIdAndUpdate(id, datos, { new: true });
        if (!tipoActualizado) {
            return res.status(404).json({ msj: 'Tipo no encontrado' });
        }
        return res.json(tipoActualizado);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msj: 'Error en el servidor' });
    }
};

const deleteTipo = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const tipoEliminado = await Tipo.findByIdAndDelete(id);
        if (!tipoEliminado) {
            return res.status(404).json({ msj: 'Tipo no encontrado' });
        }
        return res.json({ msj: 'Tipo eliminado correctamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msj: 'Error en el servidor' });
    }
};

module.exports = { createTipo, getTipos, getTiposByEstado, updateTipo, deleteTipo }
