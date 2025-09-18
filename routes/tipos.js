const { Router } = require('express');
const { createTipo, getTipos, getTiposByEstado } = require('../controllers/tipoController');

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Tipos
 *     description: Endpoints para Tipos
 * components:
 *   schemas:
 *     Tipo:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del tipo
 *         nombre:
 *           type: string
 *           description: Nombre del tipo
 *           example: "Acción"
 *         estado:
 *           type: boolean
 *           description: Estado del tipo (activo/inactivo)
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
 *         estado: true
 *         fechaCreacion: "2023-01-01T00:00:00.000Z"
 *         fechaActualizacion: "2023-01-01T00:00:00.000Z"
 *     TipoInput:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del tipo
 *       example:
 *         nombre: "Acción"
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
 * /tipos:
 *   post:
 *     summary: Crear un nuevo tipo
 *     tags: [Tipos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoInput'
 *     responses:
 *       201:
 *         description: Tipo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tipo'
 *       400:
 *         description: Error en la solicitud
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
router.post('/', createTipo);

/**
 * @swagger
 * /tipos:
 *   get:
 *     summary: Obtener todos los tipos
 *     tags: [Tipos]
 *     responses:
 *       200:
 *         description: Lista de tipos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tipo'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getTipos);

/**
 * @swagger
 * /tipos/estado:
 *   get:
 *     summary: Obtener tipos por estado
 *     tags: [Tipos]
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Estado del tipo
 *     responses:
 *       200:
 *         description: Lista de tipos filtrados por estado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tipo'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/estado', getTiposByEstado);

module.exports = router;
