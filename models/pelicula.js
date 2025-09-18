const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  año: { type: Number, required: true },
  director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true },
  genero: { type: mongoose.Schema.Types.ObjectId, ref: 'Genero', required: true },
  productora: { type: mongoose.Schema.Types.ObjectId, ref: 'Productora', required: true },
  tipo: { type: mongoose.Schema.Types.ObjectId, ref: 'Tipo', required: true },
  media: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true }
});

module.exports = mongoose.model('Pelicula', peliculaSchema);