import React, { useState, useEffect } from 'react';
import '../styles/Admin.css';

// Importamos los servicios para hablar con el Backend
import { getAllProducts, createProduct, deleteProduct } from '../services/productService';

import AdminDashboard from '../components/Admin/AdminDashboard';
import AdminProducts from '../components/Admin/AdminProducts';
import AdminUsers from '../components/Admin/AdminUsers';
import AdminAdmins from '../components/Admin/AdminAdmins';
import ProductForm from '../components/Admin/ProductForm';

const Admin = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  // --- ESTADO DE PRODUCTOS (Ahora viene de la BD) ---
  const [products, setProducts] = useState([]);

  // Estados para el formulario (modal)
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // 1. CARGAR PRODUCTOS DESDE JAVA AL INICIAR
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error cargando productos", error);
    }
  };

  // 2. GUARDAR PRODUCTO EN BASE DE DATOS (Backend)
  const handleProductSubmit = async (productData) => {
    try {
      if (editingProduct) {
        alert("La edición requiere un endpoint PUT en el backend. Por ahora crea uno nuevo.");
      } else {
        // CREAR NUEVO (POST)
        await createProduct(productData);
        alert("¡Producto guardado en la Base de Datos exitosamente!");
      }

      // Recargar la lista desde el servidor para ver el cambio
      await loadProducts();
      setShowProductForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar en el servidor. Revisa que el Backend esté corriendo.");
    }
  };

  // 3. ELIMINAR PRODUCTO DE BASE DE DATOS
  const handleDeleteProduct = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto de la BD permanentemente?')) {
      await deleteProduct(id);
      await loadProducts(); // Recargar lista
    }
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard totalProducts={products.length} />;
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
      default: return <AdminDashboard />;
    }
  };

  return (
      <div className="admin-container">
        <nav className="admin-sidebar">
          <h3>Panel Admin</h3>
          <ul>
            <li><button onClick={() => setActiveSection('dashboard')}>Dashboard</button></li>
            <li><button onClick={() => setActiveSection('products')}>Productos (BD)</button></li>
            <li><button onClick={() => setActiveSection('users')}>Usuarios</button></li>
            <li><button onClick={handleLogout} className="btn-danger">Cerrar Sesión</button></li>
          </ul>
        </nav>

        <main className="admin-content">
          {renderSection()}
        </main>

        {/* MODAL DEL FORMULARIO */}
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