import { useState } from 'react';

const LoginForm = ({ onPageChange }) => {
    

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
    
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 

        // Comprobamos si las credenciales son las del admin
        if (formData.email === 'admin@techstore.com' && formData.password === 'admin123') {
            
            // 1. Es Admin: Guardamos el token en el navegador
            localStorage.setItem('admin-token', 'aqui-va-un-token-secreto');
            
            // 2. Usamos onPageChange para navegar a la página de admin
            onPageChange('admin');

        } else {
            alert('Email o contraseña incorrecta. Por favor, inténtelo de nuevo.');
            setFormData({ ...formData, password: '' });
        }
    };

    return (
        <form id="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                />
            </div>
            
            <button type="submit" className="btn">Iniciar Sesión</button>
            
            <div className="login-options">
                <a 
                    href="#" 
                    onClick={(e) => {
                        e.preventDefault();
                        onPageChange('registro');
                    }}
                >
                    ¿No tienes cuenta? Regístrate
                </a>
                <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
        </form>
    );
};

export default LoginForm;