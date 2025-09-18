import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function DirectorList() {
  const [directores, setDirectores] = useState([]);
  const [form, setForm] = useState({ nombres: '', apellidos: '', nacionalidad: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ nombres: '', apellidos: '', nacionalidad: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/directores')
      .then(res => setDirectores(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/directores', form);
      setDirectores([...directores, res.data]);
      setForm({ nombres: '', apellidos: '', nacionalidad: '' });
      Swal.fire('Creado', 'Director creado correctamente', 'success');
    } catch {
      Swal.fire('Error', 'No se pudo crear.', 'error');
    }
  };

  const handleEditClick = director => {
    setEditId(director._id);
    setEditForm({ nombres: director.nombres, apellidos: director.apellidos || '', nacionalidad: director.nacionalidad || '' });
  };

  const handleEditInputChange = e => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async id => {
    try {
      const res = await axios.put(`http://localhost:3000/directores/${id}`, editForm);
      setDirectores(directores.map(d => d._id === id ? res.data : d));
      setEditId(null);
      Swal.fire('Actualizado', 'Director actualizado correctamente', 'success');
    } catch {
      Swal.fire('Error', 'No se pudo actualizar.', 'error');
    }
  };

  const handleDelete = async id => {
    const result = await Swal.fire({
      title: '¿Eliminar director?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/directores/${id}`);
        setDirectores(directores.filter(d => d._id !== id));
        Swal.fire('Eliminado', 'El director ha sido eliminado.', 'success');
      } catch {
        Swal.fire('Error', 'No se pudo eliminar.', 'error');
      }
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Gestión de Directores</h2>
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          name="nombres"
          placeholder="Nombres"
          value={form.nombres}
          onChange={handleInputChange}
          required
          style={{ flex: '1', minWidth: '120px' }}
        />
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          value={form.apellidos}
          onChange={handleInputChange}
          style={{ flex: '1', minWidth: '120px' }}
        />
        <input
          type="text"
          name="nacionalidad"
          placeholder="Nacionalidad"
          value={form.nacionalidad}
          onChange={handleInputChange}
          style={{ flex: '1', minWidth: '120px' }}
        />
        <button type="submit" className="btn btn-success" style={{ minWidth: '100px' }}>Crear</button>
      </form>
      <table className="table table-bordered table-hover" style={{ width: '100%', background: '#f9f9f9' }}>
        <thead style={{ background: '#e9ecef' }}>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Nacionalidad</th>
            <th style={{ textAlign: 'center' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directores.map(d => (
            <tr key={d._id}>
              {editId === d._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="nombres"
                      value={editForm.nombres}
                      onChange={handleEditInputChange}
                      required
                      style={{ width: '100%' }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="apellidos"
                      value={editForm.apellidos}
                      onChange={handleEditInputChange}
                      style={{ width: '100%' }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="nacionalidad"
                      value={editForm.nacionalidad}
                      onChange={handleEditInputChange}
                      style={{ width: '100%' }}
                    />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditSave(d._id)}>Guardar</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditId(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{d.nombres}</td>
                  <td>{d.apellidos}</td>
                  <td>{d.nacionalidad}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(d)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(d._id)}>Eliminar</button>
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

export default DirectorList;
