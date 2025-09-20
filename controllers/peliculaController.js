const Pelicula = require('../models/pelicula');
const Media = require('../models/media'); // Importar el modelo Media
const path = require('path');
const fs = require('fs');

// Middleware para manejar la carga de imágenes
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage });
exports.uploadImage = upload.single('imagen');

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

// Crear película
exports.createPelicula = async (req, res) => {
  try {
    console.log('Datos recibidos en el backend:', req.body); // Registro para depuración

    const { titulo, año, director, genero, productora, tipo, imagenUrl } = req.body;

    // Validar campos relacionados
    const relatedFields = { titulo, año, director, genero, productora, tipo, imagenUrl };
    for (const [key, value] of Object.entries(relatedFields)) {
      if (!value) {
        console.log(`Campo faltante: ${key}`); // Registro para depuración
        return res.status(400).json({ error: `${key} es obligatorio.` });
      }
    }

    // Crear o buscar el documento Media
    let mediaDocument = await Media.findOne({ url: imagenUrl });
    if (!mediaDocument) {
      mediaDocument = new Media({ url: imagenUrl, nombre: `Media de ${titulo}` });
      await mediaDocument.save();
    }

    // Crear el documento Pelicula
    const pelicula = new Pelicula({
      titulo,
      año,
      director,
      genero,
      productora,
      tipo,
      media: mediaDocument._id,
    });

    await pelicula.save();
    console.log('Película creada exitosamente:', pelicula); // Registro para depuración
    res.status(201).json(pelicula);
  } catch (error) {
    console.error('Error al crear la película:', error);
    res.status(500).json({ error: 'Error interno al crear la película.' });
  }
};

// Obtener todas las películas
exports.getPeliculas = async (req, res) => {
  try {
    const { genero, productora, medio, tipo } = req.query;
    const filters = {};

    if (genero) filters.genero = genero;
    if (productora) filters.productora = productora;
    if (medio) filters.media = medio;
    if (tipo) filters.tipo = tipo;

    const peliculas = await Pelicula.find(filters)
      .populate('director genero productora tipo media');
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener película por ID
exports.getPeliculaById = async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id)
      .populate('director genero productora tipo media');
    if (!pelicula) return res.status(404).json({ error: 'No encontrada' });
    res.json(pelicula);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar película
exports.updatePelicula = async (req, res) => {
  try {
    const pelicula = await Pelicula.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pelicula) return res.status(404).json({ error: 'No encontrada' });
    res.json(pelicula);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar película
exports.deletePelicula = async (req, res) => {
  try {
    const pelicula = await Pelicula.findByIdAndDelete(req.params.id);
    if (!pelicula) return res.status(404).json({ error: 'No encontrada' });
    res.json({ mensaje: 'Película eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
