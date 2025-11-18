import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-container">
                <div className="footer-content">
                    {/* Información de la empresa */}
                    <div className="footer-section">
                        <h3>TechStore</h3>
                        <p>Tu tienda de tecnología de confianza con los mejores productos al mejor precio.</p>
                        <div className="social-links">
                            <a href="#" aria-label="Facebook">📘</a>
                            <a href="#" aria-label="Twitter">🐦</a>
                            <a href="#" aria-label="Instagram">📷</a>
                        </div>
                    </div>

                    {/* Enlaces rápidos */}
                    <div className="footer-section">
                        <h4>Enlaces Rápidos</h4>
                        <ul>
                            <li><a href="#inicio">Inicio</a></li>
                            <li><a href="#productos">Productos</a></li>
                            <li><a href="#nosotros">Nosotros</a></li>
                            <li><a href="#contacto">Contacto</a></li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div className="footer-section">
                        <h4>Contacto</h4>
                        <ul>
                            <li>📧 info@techstore.com</li>
                            <li>📞 +56 9 1234 5678</li>
                            <li>📍 Santiago, Chile</li>
                        </ul>
                    </div>

                    {/* Horario */}
                    <div className="footer-section">
                        <h4>Horario de Atención</h4>
                        <ul>
                            <li>Lunes a Viernes: 9:00 - 18:00</li>
                            <li>Sábados: 10:00 - 14:00</li>
                            <li>Domingos: Cerrado</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 TechStore. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;