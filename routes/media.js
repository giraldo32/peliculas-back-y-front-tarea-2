const { Router } = require('express')
const { createMedia, getMedias, getMediasByEstado, updateMedia, deleteMedia } = require('../controllers/mediaController')

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Media
 *   description: Endpoints para Media
 */

/**
 * @swagger
 * /medias:
 *   post:
 *     summary: Crear una nueva media
 *     tags: [Media]
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
 *         description: Media creada exitosamente
 */
router.post('/', createMedia)

/**
 * @swagger
 * /medias:
 *   get:
 *     summary: Obtener todas las medias
 *     tags: [Media]
 *     responses:
 *       200:
 *         description: Lista de medias
 */
router.get('/', getMedias)

/**
 * @swagger
 * /medias/estado:
 *   get:
 *     summary: Obtener medias por estado
 *     tags: [Media]
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Estado de la media
 *     responses:
 *       200:
 *         description: Lista de medias filtradas por estado
 */
router.get('/estado', getMediasByEstado)

router.put('/:id', updateMedia)
router.delete('/:id', deleteMedia)

module.exports = router