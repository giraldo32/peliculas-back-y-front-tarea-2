const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/peliculaController');

// Crear película
router.post('/', peliculaController.uploadImage, peliculaController.createPelicula);
// Obtener todas las películas
router.get('/', peliculaController.getPeliculas);
// Obtener película por ID
router.get('/:id', peliculaController.getPeliculaById);
// Actualizar película
router.put('/:id', peliculaController.updatePelicula);
// Eliminar película
router.delete('/:id', peliculaController.deletePelicula);

module.exports = router;
