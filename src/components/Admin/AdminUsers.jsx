import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../../services/userService';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  // Cargar usuarios al iniciar
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar usuario de la BD permanentemente?')) {
      await deleteUser(id);
      loadUsers(); // Recargar tabla
    }
  };

  return (
      <div className="admin-section-container">
        <div className="admin-header">
          <div>
            <h2>Gestión de Usuarios</h2>
            <p className="subtitle">Usuarios registrados en la Base de Datos</p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {users.length > 0 ? (
                users.map((user) => (
                    <tr key={user.id}>
                      <td>#{user.id}</td>
                      <td className="fw-bold">{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                    <span className={user.role === 'admin' ? 'badge-admin' : 'badge-client'}>
                        {user.role || 'cliente'}
                    </span>
                      </td>
                      <td>
                        <button
                            className="btn-icon delete"
                            onClick={() => handleDelete(user.id)}
                            title="Eliminar"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                  <td colSpan="5" className="empty-state">
                    📭 No hay usuarios registrados en la Base de Datos.
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default AdminUsers;