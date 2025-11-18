import React, { useState, useEffect } from 'react';
import '../styles/Admin.css';
import { products as initialProductsObject } from '../data/products.js';
import { initialUsers } from '../data/users.js';
import { initialAdmins } from '../data/admins.js';

import AdminDashboard from '../components/Admin/AdminDashboard';
import AdminProducts from '../components/Admin/AdminProducts';
import AdminUsers from '../components/Admin/AdminUsers';
import AdminAdmins from '../components/Admin/AdminAdmins';
import ProductForm from '../components/Admin/ProductForm';

const initialProducts = Object.values(initialProductsObject);

const useStickyState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key); 
    
    if (stickyValue !== null) {
      try {
        const parsedValue = JSON.parse(stickyValue);
        
        if (Array.isArray(defaultValue)) {
          if (Array.isArray(parsedValue)) {
            return parsedValue;
          }
        } else {
          return parsedValue;
        }
      } catch (e) {
        console.error("Error al parsear localStorage", e);
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

// Se agrega la prop 'onPageChange'
const Admin = ({ onPageChange }) => {
  //Estado para manejar la sección activa
  const [activeSection, setActiveSection] = useState('dashboard');

  // Estados para los datos
  const [products, setProducts] = useStickyState(initialProducts, 'products');
  const [users, setUsers] = useStickyState(initialUsers, 'users');
  const [admins, setAdmins] = useStickyState(initialAdmins, 'admins');

  // Estado para formulario de admin
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);

  // Estados para el formulario de productos 
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null); 

  // 5. Funciones CRUD
  const handleDeleteProduct = (productId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleDeleteUser = (userId) => {
     if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      setUsers(users.filter(u => u.id !== userId));
     }
  };

  const handleDeleteAdmin = (adminId) => {
    if (admins.length <= 1) {
      alert("No puedes eliminar al último administrador.");
      return;
    }
    if (window.confirm("¿Estás seguro de que quieres eliminar a este administrador?")) {
      setAdmins(admins.filter(a => a.id !== adminId));
    }
  };
  
  // guardar el nuevo admin
  const handleAddAdmin = (newAdminData) => {
    const newAdmin = {
      id: Date.now(), 
      ...newAdminData,
      creationDate: new Date().toISOString().split('T')[0]
    };
    setAdmins([...admins, newAdmin]);
    setIsAddingAdmin(false); 
  };

//FUNCIONES CRUD PRODUCTOS

  const handleAddProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: productData.name.toLowerCase().replace(/\s+/g, '-'), 
      fullDescription: "Descripción completa pendiente.",
      features: ["Característica 1", "Característica 2"]
    };
    setProducts([...products, newProduct]);
    setIsAddingProduct(false); 
  };
  
  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
    setProductToEdit(null);
  };
  
  const handleCancelForm = () => {
    setIsAddingProduct(false);
    setProductToEdit(null);
  }


  //Cerrar Sesión
  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    if (onPageChange) {
      onPageChange('inicio');
    }
  };

  // 6. Función para renderizar el contenido de la sección activa
  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <AdminDashboard 
            productsCount={products.length}
            usersCount={users.length}
            adminsCount={admins.length}
          />
        );
      
      // <-- LÓGICA MODIFICADA: Ahora 'products' decide si muestra la tabla o el formulario -->
      case 'products':
        if (isAddingProduct || productToEdit) {
          return (
            <ProductForm
              productToEdit={productToEdit} 
              onSave={productToEdit ? handleUpdateProduct : handleAddProduct}
              onCancel={handleCancelForm}
            />
          );
        }
        return (
          <AdminProducts 
            products={products}
            onDeleteProduct={handleDeleteProduct} 
            onShowAddForm={() => setIsAddingProduct(true)}
            onShowEditForm={(product) => setProductToEdit(product)}
          />
        );

      case 'users':
        return (
          <AdminUsers 
            users={users} 
            onDeleteUser={handleDeleteUser} 
          />
        );
      case 'admins':
        return (
          <AdminAdmins 
            admins={admins}
            onDeleteAdmin={handleDeleteAdmin}
            isAdding={isAddingAdmin} 
            onShowForm={() => setIsAddingAdmin(true)}
            onHideForm={() => setIsAddingAdmin(false)}
            onAddAdmin={handleAddAdmin}
          />
        );
      default:
        return <AdminDashboard />;
    }
  };

  // 7. Renderizado del componente (Sidebar + Contenido)
  return (
    <div className="admin-panel">
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
              Productos
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
          <li>
            <button 
              className={activeSection === 'admins' ? 'active' : ''}
              onClick={() => setActiveSection('admins')}
            >
              Administradores
            </button>
          </li>

          <li style={{ marginTop: '20px', borderTop: '1px solid #004cffff', paddingTop: '10px' }}>
            <button 
              onClick={handleLogout} 
              className="btn-danger"
              style={{ width: '100%', color: 'red' }}
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>

      <main className="admin-content">
        {renderSection()}
      </main>
    </div>
  );
};

export default Admin;