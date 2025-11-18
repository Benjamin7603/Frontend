import React, { useState } from 'react';
import '../styles/Login.css';

const Register = ({ onPageChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    alert('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
    onPageChange('login');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre Completo:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Registrarse
          </button>
        </form>

        <div className="login-links">
          <p>
            ¿Ya tienes cuenta?{' '}
            <span 
              className="link" 
              onClick={() => onPageChange('login')}
            >
              Inicia sesión aquí
            </span>
          </p>
          <p>
            <span 
              className="link" 
              onClick={() => onPageChange('inicio')}
            >
              Volver al inicio
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;