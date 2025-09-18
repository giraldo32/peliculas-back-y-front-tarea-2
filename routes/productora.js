const { Router } = require('express')
const { createProductora, getProductoras, getProductorasByEstado, updateProductora, deleteProductora } = require('../controllers/productoraController')

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Productora
 *   description: Endpoints para Productora
 */

/**
 * @swagger
 * /productoras:
 *   post:
 *     summary: Crear una nueva productora
 *     tags: [Productora]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Productora creada exitosamente
 */
router.post('/', createProductora)

/**
 * @swagger
 * /productoras:
 *   get:
 *     summary: Obtener todas las productoras
 *     tags: [Productora]
 *     responses:
 *       200:
 *         description: Lista de productoras
 */
router.get('/', getProductoras)

/**
 * @swagger
 * /productoras/estado:
 *   get:
 *     summary: Obtener productoras por estado
 *     tags: [Productora]
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Estado de la productora
 *     responses:
 *       200:
 *         description: Lista de productoras filtradas por estado
 */
router.get('/estado', getProductorasByEstado)

router.put('/:id', updateProductora)
router.delete('/:id', deleteProductora)

module.exports = router