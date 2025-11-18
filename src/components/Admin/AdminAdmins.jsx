import React from 'react';
import AddAdminForm from './AddAdminForm'; 

const AdminAdmins = ({ 
  admins, 
  onDeleteAdmin, 
  isAdding, 
  onShowForm, 
  onHideForm, 
  onAddAdmin 
}) => {
  return (
    <div>
      <h2>Gestión de Administradores</h2>
      
      {isAdding ? (
        
        <AddAdminForm 
          onAddAdmin={onAddAdmin} 
          onHideForm={onHideForm} 
        />
      ) : (
      
        <button 
          className="btn-primary" 
          onClick={onShowForm} 
        >
          Agregar Nuevo Administrador
        </button>
      )}
      
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Validamos que admins sea un array */}
          {Array.isArray(admins) && admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.creationDate}</td>
              <td className="actions">
                <button 
                  className="btn-danger"
                  onClick={() => onDeleteAdmin(admin.id)}
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

export default AdminAdmins;