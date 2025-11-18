import React from 'react';
import '../../styles/Header.css';

const Header = ({ currentPage, onPageChange, cartCount, onCartToggle }) => {
    return (
        <header className="main-header">
            <div className="header-container">
                <div className="logo">
                    <h1>TechStore</h1>
                </div>

                <nav className="main-nav">
                    <ul className="nav-list">
                        <li>
                            <a 
                                href="#inicio" 
                                className={currentPage === 'inicio' ? 'active' : ''}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange('inicio');
                                }}
                            >
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#productos" 
                                className={currentPage === 'productos' ? 'active' : ''}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange('productos');
                                }}
                            >
                                Productos
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#nosotros" 
                                className={currentPage === 'nosotros' ? 'active' : ''}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange('nosotros');
                                }}
                            >
                                Nosotros
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#blogs" 
                                className={currentPage === 'blogs' ? 'active' : ''}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange('blogs');
                                }}
                            >
                                Blogs
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#contacto" 
                                className={currentPage === 'contacto' ? 'active' : ''}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange('contacto');
                                }}
                            >
                                Contacto
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="header-actions">
                    <button 
                        className="cart-button"
                        onClick={onCartToggle}
                    >
                        🛒 Carrito
                        {cartCount > 0 && (
                            <span className="cart-badge">{cartCount}</span>
                        )}
                    </button>
                    
                    <button 
                        className="login-button"
                        onClick={() => onPageChange('login')}
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;