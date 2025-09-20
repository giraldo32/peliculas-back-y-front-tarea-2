import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ProductoraList() {
  const [productoras, setProductoras] = useState([]);
  const [form, setForm] = useState({ nombre: '', pais: '', estado: true });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ nombre: '', pais: '', estado: true });

  useEffect(() => {
    axios.get('http://localhost:3000/productoras')
      .then(res => {
        if (Array.isArray(res.data)) {
          setProductoras(res.data);
        } else {
          setProductoras([]);
        }
      })
      .catch(err => {
        setProductoras([]);
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
      if (!form.pais || form.pais.trim() === '') {
        Swal.fire('Error', 'El campo país es obligatorio.', 'error');
        return;
      }
      const res = await axios.post('http://localhost:3000/productoras', {
        nombre: form.nombre,
        pais: form.pais,
        estado: form.estado
      });
      setProductoras([...productoras, res.data]);
      setForm({ nombre: '', pais: '', estado: true });
      Swal.fire('Creado', 'Productora creada correctamente', 'success');
    } catch {
      Swal.fire('Error', 'No se pudo crear.', 'error');
    }
  };

  const handleEditClick = p => {
    setEditId(p._id);
    setEditForm({ nombre: p.nombre, pais: p.pais || '', estado: p.estado });
  };

  const handleEditInputChange = e => {
    const { name, value, type, checked } = e.target;
    setEditForm({ ...editForm, [name]: type === 'checkbox' ? checked : value });
  };

  const handleEditSave = async id => {
    try {
      const res = await axios.put(`http://localhost:3000/productoras/${id}`, editForm);
      setProductoras(productoras.map(p => p._id === id ? res.data : p));
      setEditId(null);
      Swal.fire('Actualizado', 'Productora actualizada correctamente', 'success');
    } catch {
      Swal.fire('Error', 'No se pudo actualizar.', 'error');
    }
  };

  const handleDelete = async id => {
    const result = await Swal.fire({
      title: '¿Eliminar productora?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/productoras/${id}`);
        setProductoras(productoras.filter(p => p._id !== id));
        Swal.fire('Eliminado', 'La productora ha sido eliminada.', 'success');
      } catch {
        Swal.fire('Error', 'No se pudo eliminar.', 'error');
      }
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Gestión de Productoras</h2>
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleInputChange}
          required
          style={{ flex: '1', minWidth: '120px' }}
        />
        <input
          type="text"
          name="pais"
          placeholder="País"
          value={form.pais}
          onChange={handleInputChange}
          style={{ flex: '1', minWidth: '120px' }}
        />
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            name="estado"
            checked={form.estado}
            onChange={handleInputChange}
          /> Activa
        </label>
        <button type="submit" className="btn btn-success" style={{ minWidth: '100px' }}>Crear</button>
      </form>
      <table className="table table-bordered table-hover" style={{ width: '100%', background: '#f9f9f9' }}>
        <thead style={{ background: '#e9ecef' }}>
          <tr>
            <th>Nombre</th>
            <th>País</th>
            <th>Estado</th>
            <th style={{ textAlign: 'center' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productoras.map(p => (
            <tr key={p._id}>
              {editId === p._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="nombre"
                      value={editForm.nombre}
                      onChange={handleEditInputChange}
                      required
                      style={{ width: '100%' }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="pais"
                      value={editForm.pais}
                      onChange={handleEditInputChange}
                      style={{ width: '100%' }}
                    />
                  </td>
                  <td>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="checkbox"
                        name="estado"
                        checked={editForm.estado}
                        onChange={handleEditInputChange}
                      /> Activa
                    </label>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditSave(p._id)}>Guardar</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditId(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{p.nombre}</td>
                  <td>{p.pais}</td>
                  <td>{p.estado ? 'Activa' : 'Inactiva'}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(p)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}>Eliminar</button>
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

export default ProductoraList;
