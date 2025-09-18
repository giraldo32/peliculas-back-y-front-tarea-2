import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function MediaList() {
  const [media, setMedia] = useState([]);
  const [form, setForm] = useState({ nombre: '', estado: true });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ nombre: '', estado: true });

  useEffect(() => {
    axios.get('http://localhost:3000/media')
      .then(res => {
        if (Array.isArray(res.data)) {
          setMedia(res.data);
        } else {
          setMedia([]);
        }
      })
      .catch(err => {
        setMedia([]);
        console.error(err);
      });
  }, []);

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleCreate = async e => {
    e.preventDefault();
    try {
      // Enviar nombre y estado
      const res = await axios.post('http://localhost:3000/media', {
        nombre: form.nombre,
        estado: form.estado
      });
      setMedia([...media, res.data]);
      setForm({ nombre: '', estado: true });
      Swal.fire('Creado', 'Producción creada correctamente', 'success');
    } catch {
      Swal.fire('Error', 'No se pudo crear.', 'error');
    }
  };

  const handleEditClick = m => {
    setEditId(m._id);
    setEditForm({ nombre: m.nombre, estado: m.estado });
  };

  const handleEditInputChange = e => {
    const { name, value, type, checked } = e.target;
    setEditForm({ ...editForm, [name]: type === 'checkbox' ? checked : value });
  };

  const handleEditSave = async id => {
    try {
      const res = await axios.put(`http://localhost:3000/media/${id}`, editForm);
      setMedia(media.map(m => m._id === id ? res.data : m));
      setEditId(null);
      Swal.fire('Actualizado', 'Producción actualizada correctamente', 'success');
    } catch {
      Swal.fire('Error', 'No se pudo actualizar.', 'error');
    }
  };

  const handleDelete = async id => {
    const result = await Swal.fire({
      title: '¿Eliminar producción?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/media/${id}`);
        setMedia(media.filter(m => m._id !== id));
        Swal.fire('Eliminado', 'La producción ha sido eliminada.', 'success');
      } catch {
        Swal.fire('Error', 'No se pudo eliminar.', 'error');
      }
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#ff4b5c' }}>
        <span style={{ marginRight: '10px' }}><i className="bi bi-film" style={{ color: '#ff4b5c' }}></i></span>
        Gestión de Producciones
      </h2>
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleInputChange}
          required
          style={{ flex: '2', minWidth: '120px', borderColor: '#ff4b5c' }}
        />
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            name="estado"
            checked={form.estado}
            onChange={handleInputChange}
          /> Activo
        </label>
        <button type="submit" className="btn btn-success" style={{ minWidth: '100px', background: '#ff4b5c', border: 'none' }}>
          <i className="bi bi-plus-circle me-1"></i> Crear
        </button>
      </form>
      <table className="table table-bordered table-hover" style={{ width: '100%', background: '#f9f9f9' }}>
        <thead style={{ background: '#e9ecef' }}>
          <tr>
            <th><i className="bi bi-film" style={{ color: '#ff4b5c' }}></i> Nombre</th>
            <th><i className="bi bi-check-circle" style={{ color: '#ff4b5c' }}></i> Estado</th>
            <th style={{ textAlign: 'center' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(media) && media.length > 0
            ? media.map(m => (
                <tr key={m._id}>
                  {editId === m._id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="nombre"
                          value={editForm.nombre}
                          onChange={handleEditInputChange}
                          required
                          style={{ width: '100%', borderColor: '#ff4b5c' }}
                        />
                      </td>
                      <td>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="checkbox"
                            name="estado"
                            checked={editForm.estado}
                            onChange={handleEditInputChange}
                          /> Activo
                        </label>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button className="btn btn-primary btn-sm me-2" style={{ background: '#ff4b5c', border: 'none' }} onClick={() => handleEditSave(m._id)}>
                          <i className="bi bi-save"></i> Guardar
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setEditId(null)}>
                          <i className="bi bi-x-circle"></i> Cancelar
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td><strong>{m.nombre}</strong></td>
                      <td>{m.estado ? <span style={{ color: '#28a745' }}><i className="bi bi-check-circle-fill"></i> Activo</span> : <span style={{ color: '#6c757d' }}><i className="bi bi-x-circle-fill"></i> Inactivo</span>}</td>
                      <td style={{ textAlign: 'center' }}>
                        <button className="btn btn-warning btn-sm me-2" style={{ background: '#ffb347', border: 'none', color: '#fff' }} onClick={() => handleEditClick(m)}>
                          <i className="bi bi-pencil-square"></i> Editar
                        </button>
                        <button className="btn btn-danger btn-sm" style={{ background: '#ff4b5c', border: 'none' }} onClick={() => handleDelete(m._id)}>
                          <i className="bi bi-trash"></i> Eliminar
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            : <tr><td colSpan="3" style={{ textAlign: 'center' }}>No hay producciones registradas.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default MediaList;
