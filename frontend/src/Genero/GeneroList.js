import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function GeneroList() {
  const [generos, setGeneros] = useState([]);
  const [form, setForm] = useState({ nombre: '', descripcion: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ nombre: '', descripcion: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/generos')
      .then(res => setGeneros(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/generos', form);
      setGeneros([...generos, res.data]);
      setForm({ nombre: '', descripcion: '' });
      Swal.fire('Creado', 'Género creado correctamente', 'success');
    } catch {
      Swal.fire('Error', 'No se pudo crear.', 'error');
    }
  };

  const handleEditClick = genero => {
    setEditId(genero._id);
    setEditForm({ nombre: genero.nombre, descripcion: genero.descripcion || '' });
  };

  const handleEditInputChange = e => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async id => {
    try {
      const res = await axios.put(`http://localhost:3000/generos/${id}`, editForm);
      setGeneros(generos.map(g => g._id === id ? res.data : g));
      setEditId(null);
      Swal.fire('Actualizado', 'Género actualizado correctamente', 'success');
    } catch {
      Swal.fire('Error', 'No se pudo actualizar.', 'error');
    }
  };

  const handleDelete = async id => {
    const result = await Swal.fire({
      title: '¿Eliminar género?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/generos/${id}`);
        setGeneros(generos.filter(g => g._id !== id));
        Swal.fire('Eliminado', 'El género ha sido eliminado.', 'success');
      } catch {
        Swal.fire('Error', 'No se pudo eliminar.', 'error');
      }
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#6c63ff' }}>
        <span style={{ marginRight: '10px' }}><i className="bi bi-tags-fill" style={{ color: '#6c63ff' }}></i></span>
        Gestión de Géneros
      </h2>
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleInputChange}
          required
          style={{ flex: '1', minWidth: '120px', borderColor: '#6c63ff' }}
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleInputChange}
          style={{ flex: '2', minWidth: '180px', borderColor: '#6c63ff' }}
        />
        <button type="submit" className="btn btn-success" style={{ minWidth: '100px', background: '#6c63ff', border: 'none' }}>
          <i className="bi bi-plus-circle me-1"></i> Crear
        </button>
      </form>
      <table className="table table-bordered table-hover" style={{ width: '100%', background: '#f9f9f9' }}>
        <thead style={{ background: '#e9ecef' }}>
          <tr>
            <th><i className="bi bi-tag-fill" style={{ color: '#6c63ff' }}></i> Nombre</th>
            <th><i className="bi bi-card-text" style={{ color: '#6c63ff' }}></i> Descripción</th>
            <th style={{ textAlign: 'center' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.map(g => (
            <tr key={g._id}>
              {editId === g._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="nombre"
                      value={editForm.nombre}
                      onChange={handleEditInputChange}
                      required
                      style={{ width: '100%', borderColor: '#6c63ff' }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="descripcion"
                      value={editForm.descripcion}
                      onChange={handleEditInputChange}
                      style={{ width: '100%', borderColor: '#6c63ff' }}
                    />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn btn-primary btn-sm me-2" style={{ background: '#6c63ff', border: 'none' }} onClick={() => handleEditSave(g._id)}>
                      <i className="bi bi-save"></i> Guardar
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditId(null)}>
                      <i className="bi bi-x-circle"></i> Cancelar
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{g.nombre}</td>
                  <td>{g.descripcion}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn btn-warning btn-sm me-2" style={{ background: '#ffb347', border: 'none', color: '#fff' }} onClick={() => handleEditClick(g)}>
                      <i className="bi bi-pencil-square"></i> Editar
                    </button>
                    <button className="btn btn-danger btn-sm" style={{ background: '#ff4b5c', border: 'none' }} onClick={() => handleDelete(g._id)}>
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

export default GeneroList;
