import React from 'react';
import '../../styles/Header.css';

const Header = ({ currentPage, onPageChange, cartCount, onCartToggle, user, onLogout }) => {
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
                                onClick={(e) => { e.preventDefault(); onPageChange('inicio'); }}
                            >
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a
                                href="#productos"
                                className={currentPage === 'productos' ? 'active' : ''}
                                onClick={(e) => { e.preventDefault(); onPageChange('productos'); }}
                            >
                                Productos
                            </a>
                        </li>
                        <li>
                            <a
                                href="#nosotros"
                                className={currentPage === 'nosotros' ? 'active' : ''}
                                onClick={(e) => { e.preventDefault(); onPageChange('nosotros'); }}
                            >
                                Nosotros
                            </a>
                        </li>
                        <li>
                            <a
                                href="#blogs"
                                className={currentPage === 'blogs' ? 'active' : ''}
                                onClick={(e) => { e.preventDefault(); onPageChange('blogs'); }}
                            >
                                Blogs
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contacto"
                                className={currentPage === 'contacto' ? 'active' : ''}
                                onClick={(e) => { e.preventDefault(); onPageChange('contacto'); }}
                            >
                                Contacto
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="header-actions">
                    {/* LÓGICA DE USUARIO: Si existe, mostramos nombre. Si no, botón Login */}
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
                            <span>Hola, <b>{user.name}</b></span>

                            {/* Si es Admin, botón extra para volver al panel */}
                            {user.role === 'admin' && (
                                <button
                                    onClick={() => onPageChange('admin')}
                                    style={{ padding: '5px 10px', fontSize: '0.8rem', cursor: 'pointer', borderRadius: '4px', border: 'none' }}
                                >
                                    Panel
                                </button>
                            )}

                            <button
                                onClick={onLogout}
                                style={{ padding: '5px 10px', fontSize: '0.8rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Salir
                            </button>
                        </div>
                    ) : (
                        <button
                            className="login-button"
                            onClick={() => onPageChange('login')}
                        >
                            Iniciar Sesión
                        </button>
                    )}

                    <button
                        className="cart-button"
                        onClick={onCartToggle}
                    >
                        🛒 Carrito
                        {cartCount > 0 && (
                            <span className="cart-badge">{cartCount}</span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;