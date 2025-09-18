const { Router } = require('express');

const {
    createDirector,
    getDirectores,
    getDirectoresByEstado,
    updateDirector,
    deleteDirector
} = require('../controllers/directorController');

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Director:
 *       type: object
 *       required:
 *         - nombres
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del director
 *         nombres:
 *           type: string
 *           description: Nombres completos del director
 *         estado:
 *           type: boolean
 *           description: Estado del director (activo/inactivo)
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
 *         nombres: "Christopher Nolan"
 *         estado: true
 *         fechaCreacion: "2023-01-01T00:00:00.000Z"
 *         fechaActualizacion: "2023-01-01T00:00:00.000Z"
 *     DirectorInput:
 *       type: object
 *       required:
 *         - nombres
 *       properties:
 *         nombres:
 *           type: string
 *           description: Nombres completos del director
 *       example:
 *         nombres: "Christopher Nolan"
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
 * /directores:
 *   post:
 *     summary: Crear un nuevo director
 *     tags: [Directores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DirectorInput'
 *     responses:
 *       201:
 *         description: Director creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Director'
 *       400:
 *         description: Error de validación (nombres requeridos)
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
router.post('/', createDirector)

/**
 * @swagger
 * /directores:
 *   get:
 *     summary: Obtener directores (todos o filtrados por estado)
 *     tags: [Directores]
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         required: false
 *         description: Filtrar por estado del director (true para activos, false para inactivos)
 *         example: "true"
 *     responses:
 *       200:
 *         description: Lista de directores obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Director'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', (req, res) => {
    if (req.query.estado) {
        return getDirectoresByEstado(req, res)
    }
    return getDirectores(req, res)
})


/**
 * @swagger
 * /directores/{id}:
 *   put:
 *     summary: Actualizar un director
 *     tags: [Directores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del director a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DirectorInput'
 *     responses:
 *       200:
 *         description: Director actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Director'
 *       404:
 *         description: Director no encontrado
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
router.put('/:id', updateDirector)
router.delete('/:id', deleteDirector)

module.exports = router
