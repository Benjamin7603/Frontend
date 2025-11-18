import { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Mensaje enviado correctamente. Te contactaremos pronto.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <div className="form-container">
            <form id="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="contactName" className="form-label">Nombre Completo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="contactName" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="contactEmail" className="form-label">Correo Electrónico</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="contactEmail" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="contactSubject" className="form-label">Asunto</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="contactSubject" 
                        value={formData.subject}
                        onChange={handleChange}
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="contactMessage" className="form-label">Mensaje</label>
                    <textarea 
                        className="form-control" 
                        id="contactMessage" 
                        rows="5" 
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                
                <button type="submit" className="btn">Enviar Mensaje</button>
            </form>
        </div>
    );
};

export default ContactForm;