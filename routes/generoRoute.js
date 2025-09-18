const { Router } = require('express')

const { 
    createGenero, 
    getGeneros, 
    getGeneroById, 
    updateGenero, 
    deleteGenero 
} = require('../controllers/generoController')
const { validarNombreGeneroUnico, requerirNombreGenero } = require('../middlewares/validarGenero')

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Genero:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del género
 *         nombre:
 *           type: string
 *           description: Nombre del género
 *         descripcion:
 *           type: string
 *           description: Descripción del género
 *         estado:
 *           type: boolean
 *           description: Estado del género (activo/inactivo)
 *           default: true
 *         fechaCreacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         fechaActualizacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         nombre: "Acción"
 *         descripcion: "Películas de acción y aventura"
 *         estado: true
 *         fechaCreacion: "2023-01-01T00:00:00.000Z"
 *         fechaActualizacion: "2023-01-01T00:00:00.000Z"
 *     GeneroInput:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del género
 *         descripcion:
 *           type: string
 *           description: Descripción del género
 *       example:
 *         nombre: "Acción"
 *         descripcion: "Películas de acción y aventura"
 *     Error:
 *       type: object
 *       properties:
 *         msj:
 *           type: string
 *           description: Mensaje de error
 *       example:
 *         msj: "Error en el servidor"
 */

/**
 * @swagger
 * /generos:
 *   post:
 *     summary: Crear un nuevo género
 *     tags: [Géneros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GeneroInput'
 *     responses:
 *       201:
 *         description: Género creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genero'
 *       400:
 *         description: Error de validación (nombre requerido o ya existe)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', requerirNombreGenero, validarNombreGeneroUnico, createGenero)

/**
 * @swagger
 * /generos:
 *   get:
 *     summary: Obtener todos los géneros
 *     tags: [Géneros]
 *     responses:
 *       200:
 *         description: Lista de géneros obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genero'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getGeneros)

/**
 * @swagger
 * /generos/{id}:
 *   get:
 *     summary: Obtener un género por ID
 *     tags: [Géneros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del género
 *     responses:
 *       200:
 *         description: Género encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genero'
 *       404:
 *         description: Género no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getGeneroById)

/**
 * @swagger
 * /generos/{id}:
 *   put:
 *     summary: Actualizar un género
 *     tags: [Géneros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del género a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GeneroInput'
 *     responses:
 *       200:
 *         description: Género actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genero'
 *       400:
 *         description: Error de validación (nombre requerido o ya existe)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Género no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', requerirNombreGenero, validarNombreGeneroUnico, updateGenero)

/**
 * @swagger
 * /generos/{id}:
 *   delete:
 *     summary: Eliminar un género
 *     tags: [Géneros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del género a eliminar
 *     responses:
 *       200:
 *         description: Género eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msj:
 *                   type: string
 *                   example: "Genero eliminado correctamente"
 *       404:
 *         description: Género no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', deleteGenero)

module.exports = router