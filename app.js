
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
// Ruta especial para evitar 404 de Chrome DevTools (debe ir después de crear app)
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.status(204).send(); // 204 No Content
});

// Middleware para que Express pueda entender y procesar JSON en las peticiones POST
app.use(express.json())
app.use(cors({
  origin: '*'
}))

// Middleware para configurar Content Security Policy (CSP)
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:3000"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
  }
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
// No se sirve frontend porque no existe carpeta build

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




// Ruta raíz para mensaje de ok y versión (siempre responde JSON)
const packageJson = require('./package.json');
app.get('/', (req, res) => {
  res.json({ mensaje: 'ok', version: packageJson.version });
});




module.exports = app;