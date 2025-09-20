import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function CrearPelicula() {
  const [form, setForm] = useState({
    titulo: '',
    año: '',
    director: '',
    genero: '',
    productora: '',
    tipo: '',
    imagenUrl: '', 
  });

  const [directores, setDirectores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/directores').then(res => setDirectores(res.data));
    axios.get('http://localhost:3000/generos').then(res => setGeneros(res.data));
    axios.get('http://localhost:3000/productoras').then(res => setProductoras(res.data));
    axios.get('http://localhost:3000/tipos').then(res => setTipos(res.data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Datos enviados al backend:', form); // Registro para depuración

    try {
      const response = await axios.post('http://localhost:3000/peliculas', form);
      Swal.fire('Éxito', 'Película creada correctamente', 'success');
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al crear la película:', error);
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
      }
      Swal.fire('Error', 'No se pudo crear la película', 'error');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Crear Película</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleInputChange}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Año:</label>
          <input
            type="number"
            name="año"
            value={form.año}
            onChange={handleInputChange}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Director:</label>
          <select
            name="director"
            value={form.director}
            onChange={handleInputChange}
            required
            style={{ width: '100%' }}
          >
            <option value="">Seleccione un director</option>
            {directores.map(d => (
              <option key={d._id} value={d._id}>{d.nombres}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Género:</label>
          <select
            name="genero"
            value={form.genero}
            onChange={handleInputChange}
            required
            style={{ width: '100%' }}
          >
            <option value="">Seleccione un género</option>
            {generos.map(g => (
              <option key={g._id} value={g._id}>{g.nombre}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Productora:</label>
          <select
            name="productora"
            value={form.productora}
            onChange={handleInputChange}
            required
            style={{ width: '100%' }}
          >
            <option value="">Seleccione una productora</option>
            {productoras.map(p => (
              <option key={p._id} value={p._id}>{p.nombre}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Tipo:</label>
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleInputChange}
            required
            style={{ width: '100%' }}
          >
            <option value="">Seleccione un tipo</option>
            {tipos.map(t => (
              <option key={t._id} value={t._id}>{t.nombre}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>URL de Imagen:</label>
          <input
            type="text"
            name="imagenUrl"
            value={form.imagenUrl}
            onChange={handleInputChange}
            required
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Crear Película
        </button>
      </form>
    </div>
  );
}

export default CrearPelicula;