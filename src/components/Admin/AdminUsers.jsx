import React from 'react';

// Recibe la lista de usuarios y la función para eliminar usuarios
const AdminUsers = ({ users, onDeleteUser }) => {
  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Fecha de Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.registryDate}</td>
              <td className="actions">
                <button 
                  className="btn-danger"
                  onClick={() => onDeleteUser(user.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;