const Genero = require('../models/genero')
const { request, response } = require('express')

const createGenero = async (req = request, res = response) => {
    try {
         const { nombre, descripcion } = req.body
        const datos = { nombre, descripcion }

        const genero = new Genero(datos)
        await genero.save()
        res.status(201).json(genero)    
    } catch (error) {
        console.log(error) 
        return res.status(500).json({ msj: 'Error en el servidor' })    
    }
   
}

const getGeneros = async (req = request, res = response) => {
    try{
        const generos = await Genero.find()
        return res.json(generos)
    }catch (error) {
        console.log(error) 
        return res.status(500).json({ msj: 'Error en el servidor' })    
    }

}

const getGeneroById = async (req = request, res = response) => {
    try{
        const { id } = req.params
        const genero = await Genero.findById(id)
        if(!genero) {
            return res.status(404).json({ msj: 'Genero no encontrado' })
        }
        return res.json(genero)
    }catch (error) {
        console.log(error) 
        return res.status(500).json({ msj: 'Error en el servidor' })    
    }
}

const updateGenero = async (req = request, res = response) => {
        // todo: implmentarlo
    try {
        const { id } = req.params
        const { nombre, descripcion } = req.body
        const datos = { nombre, descripcion }
        const generoActualizado = await Genero.findByIdAndUpdate(id, datos, { new: true })
        if(!generoActualizado) {
            return res.status(404).json({ msj: 'Genero no encontrado' })
        }
        return res.json(generoActualizado)
    } catch (error) {
        console.log(error) 
        return res.status(500).json({ msj: 'Error en el servidor' })    
    }
}

const deleteGenero = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const generoEliminado = await Genero.findByIdAndDelete(id)
        if(!generoEliminado) {
            return res.status(404).json({ msj: 'Genero no encontrado' })
        }
        return res.json({ msj: 'Genero eliminado correctamente' })
    } catch (error) {
        console.log(error) 
        return res.status(500).json({ msj: 'Error en el servidor' })    
    }
}   

module.exports = {
    createGenero,
    getGeneros,
    getGeneroById,
    updateGenero,
    deleteGenero
}   