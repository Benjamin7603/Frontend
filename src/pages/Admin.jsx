import React, { useState, useEffect } from 'react';
import '../styles/Admin.css';

// Importamos servicios
import { getAllProducts, createProduct, deleteProduct, updateProduct } from '../services/productService';
import { getAllUsers } from '../services/userService';

import AdminDashboard from '../components/Admin/AdminDashboard';
import AdminProducts from '../components/Admin/AdminProducts';
import AdminUsers from '../components/Admin/AdminUsers';
import AdminAdmins from '../components/Admin/AdminAdmins';
import ProductForm from '../components/Admin/ProductForm';

const Admin = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  // ESTADOS DE DATOS
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  // ESTADO DE CONEXIÓN
  const [isServerOnline, setIsServerOnline] = useState(true);

  // Estados para el formulario
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // 1. CARGAR DATOS AL INICIAR
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // --- PASO 1: DETECTOR DE VIDA (PING) ---
    // Intentamos tocar la puerta del servidor directamente para ver si responde.
    try {
      // Hacemos un fetch directo. Si el backend está apagado, esto lanzará un error inmediato.
      // Usamos un endpoint seguro como /api/products
      await fetch('http://localhost:8080/api/products');

      // Si pasamos esta línea, el servidor está VIVO
      setIsServerOnline(true);

    } catch (error) {
      // Si entra aquí, es porque el servidor está MUERTO (Connection Refused)
      console.error("Backend apagado o inalcanzable");
      setIsServerOnline(false);
      setProducts([]);
      setUsers([]);
      return; // ¡IMPORTANTE! Detenemos la función aquí. No intentamos cargar nada más.
    }

    // --- PASO 2: CARGA DE DATOS (Solo si el servidor respondió) ---
    try {
      const productsData = await getAllProducts();
      setProducts(productsData);

      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error procesando datos", error);
    }
  };

  // --- MÉTODOS DE PRODUCTOS ---
  const handleProductSubmit = async (productData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        alert("¡Producto actualizado correctamente!");
      } else {
        await createProduct(productData);
        alert("¡Producto nuevo guardado exitosamente!");
      }
      loadData();
      setShowProductForm(false);
      setEditingProduct(null);
    } catch (error) {
      alert("Error: No se pudo conectar con el servidor.");
      loadData(); // Re-checkeamos el estado del servidor
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await deleteProduct(id);
        loadData();
      } catch (error) {
        alert("Error al eliminar. Revisa la conexión.");
        loadData(); // Re-checkeamos
      }
    }
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
            <AdminDashboard
                totalProducts={products.length}
                totalUsers={users.length}
                isOnline={isServerOnline}
            />
        );
      case 'products':
        return (
            <AdminProducts
                products={products}
                onDeleteProduct={handleDeleteProduct}
                onShowAddForm={() => { setEditingProduct(null); setShowProductForm(true); }}
                onShowEditForm={(p) => { setEditingProduct(p); setShowProductForm(true); }}
            />
        );
      case 'users': return <AdminUsers />;
      case 'admins': return <AdminAdmins />;
      default: return <AdminDashboard totalProducts={products.length} totalUsers={users.length} isOnline={isServerOnline} />;
    }
  };

  return (
      <div className="admin-container">
        <nav className="admin-sidebar">
          <h3>Panel Admin</h3>
          <ul>
            <li>
              <button
                  className={activeSection === 'dashboard' ? 'active' : ''}
                  onClick={() => setActiveSection('dashboard')}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                  className={activeSection === 'products' ? 'active' : ''}
                  onClick={() => setActiveSection('products')}
              >
                Productos (BD)
              </button>
            </li>
            <li>
              <button
                  className={activeSection === 'users' ? 'active' : ''}
                  onClick={() => setActiveSection('users')}
              >
                Usuarios
              </button>
            </li>

            <li style={{ marginTop: 'auto' }}>
              <button onClick={handleLogout} className="btn-danger">Cerrar Sesión</button>
            </li>
          </ul>
        </nav>

        <main className="admin-content">
          {renderSection()}
        </main>

        {showProductForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <ProductForm
                    onSave={handleProductSubmit}
                    onCancel={() => setShowProductForm(false)}
                    productToEdit={editingProduct}
                />
              </div>
            </div>
        )}
      </div>
  );
};

export default Admin;