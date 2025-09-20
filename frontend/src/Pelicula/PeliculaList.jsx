import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function PeliculaList() {
  const [peliculas, setPeliculas] = useState([]);
  const [form, setForm] = useState({
    titulo: '',
    año: '',
    director: '',
    genero: '',
    productora: '',
    tipo: '',
    media: ''
  });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    titulo: '',
    año: '',
    director: '',
    genero: '',
    productora: '',
    tipo: '',
    media: ''
  });
  const [filters, setFilters] = useState({
    genero: '',
    productora: '',
    medio: '',
    tipo: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3000/peliculas')
      .then(res => setPeliculas(res.data))
      .catch(err => setPeliculas([]));
  }, []);

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setForm({ ...form, media: e.target.files[0] });
  };

  const handleCreate = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await axios.post('http://localhost:3000/peliculas', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setPeliculas([...peliculas, res.data]);
      setForm({ titulo: '', año: '', director: '', genero: '', productora: '', tipo: '', media: '' });
      Swal.fire('Creado', 'Película creada correctamente', 'success');
    } catch {
      Swal.fire('Error', 'No se pudo crear.', 'error');
    }
  };

  const handleEditClick = p => {
    setEditId(p._id);
    setEditForm({
      titulo: p.titulo,
      año: p.año,
      director: p.director?._id || '',
      genero: p.genero?._id || '',
      productora: p.productora?._id || '',
      tipo: p.tipo?._id || '',
      media: p.media?._id || ''
    });
  };

  const handleEditInputChange = e => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async id => {
    try {
      const res = await axios.put(`http://localhost:3000/peliculas/${id}`, editForm);
      setPeliculas(peliculas.map(p => p._id === id ? res.data : p));
      setEditId(null);
      Swal.fire('Actualizado', 'Película actualizada correctamente', 'success');
    } catch {
      Swal.fire('Error', 'No se pudo actualizar.', 'error');
    }
  };

  const handleDelete = async id => {
    const result = await Swal.fire({
      title: '¿Eliminar película?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/peliculas/${id}`);
        setPeliculas(peliculas.filter(p => p._id !== id));
        Swal.fire('Eliminado', 'La película ha sido eliminada.', 'success');
      } catch {
        Swal.fire('Error', 'No se pudo eliminar.', 'error');
      }
    }
  };

  const handleFilterChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const fetchFilteredPeliculas = () => {
    const query = Object.entries(filters)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    axios.get(`http://localhost:3000/peliculas?${query}`)
      .then(res => setPeliculas(res.data))
      .catch(err => setPeliculas([]));
  };

  useEffect(() => {
    fetchFilteredPeliculas();
  }, [filters]);

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#0077b6' }}>
        <span style={{ marginRight: '10px' }}><i className="bi bi-camera-reels-fill" style={{ color: '#0077b6' }}></i></span>
        Gestión de Películas
      </h2>
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <input type="text" name="titulo" placeholder="Título" value={form.titulo} onChange={handleInputChange} required style={{ flex: '2', minWidth: '120px', borderColor: '#0077b6' }} />
        <input type="number" name="año" placeholder="Año" value={form.año} onChange={handleInputChange} required style={{ flex: '1', minWidth: '80px', borderColor: '#0077b6' }} />
        <input type="text" name="director" placeholder="ID Director" value={form.director} onChange={handleInputChange} required style={{ flex: '1', minWidth: '80px', borderColor: '#0077b6' }} />
        <input type="text" name="genero" placeholder="ID Género" value={form.genero} onChange={handleInputChange} required style={{ flex: '1', minWidth: '80px', borderColor: '#0077b6' }} />
        <input type="text" name="productora" placeholder="ID Productora" value={form.productora} onChange={handleInputChange} required style={{ flex: '1', minWidth: '80px', borderColor: '#0077b6' }} />
        <input type="text" name="tipo" placeholder="ID Tipo" value={form.tipo} onChange={handleInputChange} required style={{ flex: '1', minWidth: '80px', borderColor: '#0077b6' }} />
        <input type="file" name="media" onChange={handleFileChange} required style={{ flex: '1', minWidth: '80px', borderColor: '#0077b6' }} />
        <button type="submit" className="btn btn-success" style={{ minWidth: '100px', background: '#0077b6', border: 'none' }}>
          <i className="bi bi-plus-circle me-1"></i> Crear
        </button>
      </form>
      <form style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <select name="genero" value={filters.genero} onChange={handleFilterChange} style={{ flex: '1', minWidth: '120px', borderColor: '#0077b6' }}>
          <option value="">Todos los géneros</option>
          {/* Opciones dinámicas */}
        </select>
        <select name="productora" value={filters.productora} onChange={handleFilterChange} style={{ flex: '1', minWidth: '120px', borderColor: '#0077b6' }}>
          <option value="">Todas las productoras</option>
          {/* Opciones dinámicas */}
        </select>
        <select name="medio" value={filters.medio} onChange={handleFilterChange} style={{ flex: '1', minWidth: '120px', borderColor: '#0077b6' }}>
          <option value="">Todos los medios</option>
          {/* Opciones dinámicas */}
        </select>
        <select name="tipo" value={filters.tipo} onChange={handleFilterChange} style={{ flex: '1', minWidth: '120px', borderColor: '#0077b6' }}>
          <option value="">Todos los tipos</option>
          {/* Opciones dinámicas */}
        </select>
      </form>
      <table className="table table-bordered table-hover" style={{ width: '100%', background: '#f9f9f9' }}>
        <thead style={{ background: '#e9ecef' }}>
          <tr>
            <th><i className="bi bi-film" style={{ color: '#0077b6' }}></i> Título</th>
            <th><i className="bi bi-calendar" style={{ color: '#0077b6' }}></i> Año</th>
            <th><i className="bi bi-person-video" style={{ color: '#0077b6' }}></i> Director</th>
            <th><i className="bi bi-tags" style={{ color: '#0077b6' }}></i> Género</th>
            <th><i className="bi bi-building" style={{ color: '#0077b6' }}></i> Productora</th>
            <th><i className="bi bi-list-ul" style={{ color: '#0077b6' }}></i> Tipo</th>
            <th><i className="bi bi-film" style={{ color: '#0077b6' }}></i> Media</th>
            <th style={{ textAlign: 'center' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {peliculas.map(p => (
            <tr key={p._id}>
              {editId === p._id ? (
                <>
                  <td><input type="text" name="titulo" value={editForm.titulo} onChange={handleEditInputChange} required style={{ width: '100%', borderColor: '#0077b6' }} /></td>
                  <td><input type="number" name="año" value={editForm.año} onChange={handleEditInputChange} required style={{ width: '100%', borderColor: '#0077b6' }} /></td>
                  <td><input type="text" name="director" value={editForm.director} onChange={handleEditInputChange} required style={{ width: '100%', borderColor: '#0077b6' }} /></td>
                  <td><input type="text" name="genero" value={editForm.genero} onChange={handleEditInputChange} required style={{ width: '100%', borderColor: '#0077b6' }} /></td>
                  <td><input type="text" name="productora" value={editForm.productora} onChange={handleEditInputChange} required style={{ width: '100%', borderColor: '#0077b6' }} /></td>
                  <td><input type="text" name="tipo" value={editForm.tipo} onChange={handleEditInputChange} required style={{ width: '100%', borderColor: '#0077b6' }} /></td>
                  <td><input type="text" name="media" value={editForm.media} onChange={handleEditInputChange} required style={{ width: '100%', borderColor: '#0077b6' }} /></td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn btn-primary btn-sm me-2" style={{ background: '#0077b6', border: 'none' }} onClick={() => handleEditSave(p._id)}>
                      <i className="bi bi-save"></i> Guardar
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditId(null)}>
                      <i className="bi bi-x-circle"></i> Cancelar
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{p.titulo}</td>
                  <td>{p.año}</td>
                  <td>{p.director?.nombres || p.director || ''}</td>
                  <td>{p.genero?.nombre || p.genero || ''}</td>
                  <td>{p.productora?.nombre || p.productora || ''}</td>
                  <td>{p.tipo?.nombre || p.tipo || ''}</td>
                  <td>{p.media?.nombre || p.media || ''}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn btn-warning btn-sm me-2" style={{ background: '#90e0ef', border: 'none', color: '#0077b6' }} onClick={() => handleEditClick(p)}>
                      <i className="bi bi-pencil-square"></i> Editar
                    </button>
                    <button className="btn btn-danger btn-sm" style={{ background: '#0077b6', border: 'none' }} onClick={() => handleDelete(p._id)}>
                      <i className="bi bi-trash"></i> Eliminar
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PeliculaList;
