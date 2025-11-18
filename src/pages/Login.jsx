import React, { useState } from 'react';
import '../styles/Login.css';

const Login = ({ onPageChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = (email, password) => {
    // Credenciales de administrador
    const adminCredentials = [
      { email: 'admin@techstore.com', password: 'admin123' },
      { email: 'admin2@techstore.com', password: 'admin456' }
    ];

    const isValidAdmin = adminCredentials.some(
      cred => cred.email === email && cred.password === password
    );

    if (isValidAdmin) {
      localStorage.setItem('admin-token', 'admin-authenticated');
      onPageChange('admin');
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Primero intentar login como admin
    if (handleAdminLogin(email, password)) {
      return;
    }

    // Si no es admin, mostrar error
    setError('Credenciales incorrectas. Intente nuevamente.');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn">
            Iniciar Sesión
          </button>
        </form>

        <div className="login-links">
          <p>
            ¿No tienes cuenta?{' '}
            <span 
              className="link" 
              onClick={() => onPageChange('registro')}
            >
              Regístrate aquí
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

export default Login;