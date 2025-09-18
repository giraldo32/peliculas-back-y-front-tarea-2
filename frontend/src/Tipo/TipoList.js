import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function TipoList() {
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({ nombre: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ nombre: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/tipos')
      .then(res => setTipos(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/tipos', form);
      setTipos([...tipos, res.data]);
      setForm({ nombre: '' });
      Swal.fire('Creado', 'Tipo creado correctamente', 'success');
    } catch {
      Swal.fire('Error', 'No se pudo crear.', 'error');
    }
  };

  const handleEditClick = t => {
    setEditId(t._id);
    setEditForm({ nombre: t.nombre });
  };

  const handleEditInputChange = e => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async id => {
    try {
      const res = await axios.put(`http://localhost:3000/tipos/${id}`, editForm);
      setTipos(tipos.map(t => t._id === id ? res.data : t));
      setEditId(null);
      Swal.fire('Actualizado', 'Tipo actualizado correctamente', 'success');
    } catch {
      Swal.fire('Error', 'No se pudo actualizar.', 'error');
    }
  };

  const handleDelete = async id => {
    const result = await Swal.fire({
      title: '¿Eliminar tipo?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/tipos/${id}`);
        setTipos(tipos.filter(t => t._id !== id));
        Swal.fire('Eliminado', 'El tipo ha sido eliminado.', 'success');
      } catch {
        Swal.fire('Error', 'No se pudo eliminar.', 'error');
      }
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#00b894' }}>
        <span style={{ marginRight: '10px' }}><i className="bi bi-list-ul" style={{ color: '#00b894' }}></i></span>
        Gestión de Tipos
      </h2>
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleInputChange}
          required
          style={{ flex: '2', minWidth: '120px', borderColor: '#00b894' }}
        />
        <button type="submit" className="btn btn-success" style={{ minWidth: '100px', background: '#00b894', border: 'none' }}>
          <i className="bi bi-plus-circle me-1"></i> Crear
        </button>
      </form>
      <table className="table table-bordered table-hover" style={{ width: '100%', background: '#f9f9f9' }}>
        <thead style={{ background: '#e9ecef' }}>
          <tr>
            <th><i className="bi bi-list-ul" style={{ color: '#00b894' }}></i> Nombre</th>
            <th style={{ textAlign: 'center' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map(t => (
            <tr key={t._id}>
              {editId === t._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="nombre"
                      value={editForm.nombre}
                      onChange={handleEditInputChange}
                      required
                      style={{ width: '100%', borderColor: '#00b894' }}
                    />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn btn-primary btn-sm me-2" style={{ background: '#00b894', border: 'none' }} onClick={() => handleEditSave(t._id)}>
                      <i className="bi bi-save"></i> Guardar
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditId(null)}>
                      <i className="bi bi-x-circle"></i> Cancelar
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{t.nombre}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn btn-warning btn-sm me-2" style={{ background: '#fdcb6e', border: 'none', color: '#fff' }} onClick={() => handleEditClick(t)}>
                      <i className="bi bi-pencil-square"></i> Editar
                    </button>
                    <button className="btn btn-danger btn-sm" style={{ background: '#d63031', border: 'none' }} onClick={() => handleDelete(t._id)}>
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

export default TipoList;
