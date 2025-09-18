const Pelicula = require('../models/pelicula');

// Crear película
exports.createPelicula = async (req, res) => {
  try {
    const pelicula = new Pelicula(req.body);
    await pelicula.save();
    res.status(201).json(pelicula);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las películas
exports.getPeliculas = async (req, res) => {
  try {
    const peliculas = await Pelicula.find()
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
