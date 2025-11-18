import React from 'react';
const AdminProducts = ({ 
  products, 
  onDeleteProduct, 
  onShowAddForm, 
  onShowEditForm 
}) => {
  return (
    <div>
      <h2>Gestión de Productos</h2>
      
      <button 
        className="btn-primary"
        onClick={onShowAddForm}
      >
        Agregar Nuevo Producto
      </button>
      
      <table className="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          
          {Array.isArray(products) && products.map((product) => (
            <tr key={product.id}>
              <td>
                 
                
                <img 
                  src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/50'} 
                  alt={product.name} 
                />
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td className="actions">
                
                <button 
                  className="btn-warning"
                  onClick={() => onShowEditForm(product)} 
                >
                  Editar
                </button>
                <button 
                  className="btn-danger" 
                  onClick={() => onDeleteProduct(product.id)}
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

export default AdminProducts;