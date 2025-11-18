import { useState } from 'react';

const RegisterForm = ({ onPageChange }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        
        if (formData.password.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres');
            return;
        }

        alert('Cuenta creada exitosamente. ¡Bienvenido a TechStore!');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        
        onPageChange('login');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <form id="registration-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="regName" className="form-label">Nombre Completo</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="regName" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="regEmail" className="form-label">Correo Electrónico</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="regEmail" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="regPassword" className="form-label">Contraseña</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="regPassword" 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                    minLength="8"
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="regConfirmPassword" className="form-label">Confirmar Contraseña</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="regConfirmPassword" 
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required 
                />
            </div>
            
            <button type="submit" className="btn">Registrarse</button>
        </form>
    );
};

export default RegisterForm;