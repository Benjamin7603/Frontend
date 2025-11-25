import React from 'react';
import '../../styles/Header.css';

const Header = ({ currentPage, onPageChange, cartCount, onCartToggle, user, onLogout }) => {
    return (
        <header className="main-header">
            <div className="header-container">

                {/* 1. LOGO */}
                <div className="logo-section">
                    <h1>TechStore</h1>
                </div>

                {/* 2. MENÚ */}
                <nav className="nav-section">
                    <ul className="nav-list">
                        {['inicio', 'productos', 'nosotros', 'blogs', 'contacto'].map((item) => (
                            <li key={item}>
                                <a
                                    href={`#${item}`}
                                    className={currentPage === item ? 'active' : ''}
                                    onClick={(e) => { e.preventDefault(); onPageChange(item); }}
                                >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* 3. ACCIONES (Usuario + Carrito) */}
                <div className="actions-section">
                    {user ? (
                        <div className="user-panel">
                            <div className="user-info">
                                <span className="welcome-text">Bienvenido,</span>
                                <span className="user-name">{user.name}</span>
                            </div>

                            <div className="user-buttons">
                                {user.role === 'admin' && (
                                    <button onClick={() => onPageChange('admin')} className="btn-panel">
                                        Panel
                                    </button>
                                )}
                                <button onClick={onLogout} className="btn-logout">
                                    Salir
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button className="btn-login" onClick={() => onPageChange('login')}>
                            Iniciar Sesión
                        </button>
                    )}

                    <button className="btn-cart" onClick={onCartToggle}>
                        🛒 Carrito
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;