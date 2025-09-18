const Productora = require('../models/productora')
const { request, response } = require('express')

const createProductora = async (req = request, res = response) => {
    try {
        const { nombre, pais, estado } = req.body;
        const datos = { nombre, pais, estado };
        const productora = new Productora(datos);
        await productora.save();
        res.status(201).json(productora);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msj: 'Error en el servidor' });
    }
}

const getProductoras = async (req = request, res = response) => {
    try{
        const productoras = await Productora.find()
        return res.json(productoras)
    }catch (error) {
        console.log(error) 
        return res.status(500).json({ msj: 'Error en el servidor' })    
    }
}

const getProductorasByEstado = async (req = request, res = response) => {
    try{
        const { estado } = req.query
        const estadoBoolean = estado === 'true'
        const productoras = await Productora.find({ estado: estadoBoolean })
        return res.json(productoras)
    }catch (error) {
        console.log(error) 
        return res.status(500).json({ msj: 'Error en el servidor' })    
    }
}

const updateProductora = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, pais } = req.body;
        const datos = { nombre, pais, fechaActualizacion: new Date() };
        const productoraActualizada = await Productora.findByIdAndUpdate(id, datos, { new: true });
        if (!productoraActualizada) {
            return res.status(404).json({ msj: 'Productora no encontrada' });
        }
        return res.json(productoraActualizada);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msj: 'Error en el servidor' });
    }
};

const deleteProductora = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const productoraEliminada = await Productora.findByIdAndDelete(id);
        if (!productoraEliminada) {
            return res.status(404).json({ msj: 'Productora no encontrada' });
        }
        return res.json({ msj: 'Productora eliminada correctamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msj: 'Error en el servidor' });
    }
};

module.exports = { createProductora, getProductoras, getProductorasByEstado, updateProductora, deleteProductora }
