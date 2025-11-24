import React, { useState } from 'react';
import { loginUser } from '../services/userService';
import '../styles/Login.css';

const Login = ({ onPageChange, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. INTENTO DE ADMIN (Hardcodeado por seguridad o facilidad)
    if (email === 'admin@techstore.com' && password === 'admin123') {
      const adminUser = { name: 'Administrador', email: email, role: 'admin' };
      onLogin(adminUser); // Avisamos a App.js
      return;
    }

    // 2. INTENTO DE USUARIO NORMAL (Consulta a Java)
    try {
      const userFound = await loginUser(email, password);

      if (userFound) {
        onLogin(userFound); // ¡Éxito! Entra el cliente
      } else {
        setError('Credenciales incorrectas o usuario no registrado.');
      }
    } catch (err) {
      setError('Error de conexión con el servidor.');
    }
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

            {error && <div className="error-message" style={{color: 'red', marginBottom:'10px'}}>{error}</div>}

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