import React from 'react';

// Este componente recibe los totales como props
const AdminDashboard = ({ productsCount, usersCount, adminsCount }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h3>Productos Disponibles</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{productsCount}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h3>Usuarios Registrados</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{usersCount}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h3>Administradores</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{adminsCount}</p>
        </div>
      </div>
      
      <p style={{ marginTop: '30px', fontSize: '18px' }}>
        ¡Bienvenido al Panel de Administración!
        <br />
        Desde aquí puedes gestionar productos, usuarios y administradores de TechStore.
      </p>
    </div>
  );
};

export default AdminDashboard;