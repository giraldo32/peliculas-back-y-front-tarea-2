// Importa el framework Express

const express = require('express')
const cors = require('cors')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
require('dotenv').config()
const { mongoConn } = require('./databases/configuration')
mongoConn()
// Crea una instancia de la aplicación Express
const app = express()

// Middleware para que Express pueda entender y procesar JSON en las peticiones POST
app.use(express.json())
app.use(cors({
  origin: '*'
}))

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST Administrador de Películas',
      version: '1.0.0',
      description: 'API para administrar películas y géneros - IUDigital de Antioquia'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo'
      }
    ]
  },
  apis: ['./routes/*.js'] // Archivos que contienen anotaciones de Swagger
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// Servir archivos estáticos del build de React
const path = require('path');
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// --- DEFINICIÓN DE ENDPOINTS ---

const generos = require('./routes/generoRoute')
const directores = require('./routes/directorRoute')
const tipos = require('./routes/tipos')
const media = require('./routes/media')
const peliculas = require('./routes/pelicula')
const productoras = require('./routes/productora')

app.use('/generos', generos)
app.use('/directores', directores)
app.use('/tipos', tipos)
app.use('/media', media)
app.use('/peliculas', peliculas)
app.use('/productoras', productoras)


app.get('/', (req, res) => {

  // Si existe el build de React, servir index.html
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// Catch-all para rutas de React
// Catch-all para rutas de React (excepto API y archivos estáticos)
app.get(/^((?!api-docs|generos|directores|tipos|uploads|swagger).)*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

module.exports = app;