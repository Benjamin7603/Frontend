import React from 'react';
import '../../styles/Header.css';

const Header = ({ currentPage, onPageChange, cartCount, onCartToggle, user, onLogout }) => {
    return (
        <header className="main-header" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <div className="header-container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 40px', // Aumenté el espacio a los costados (era muy poco)
                maxWidth: '100%',
                margin: '0 auto'
            }}>

                {/* 1. SECCIÓN IZQUIERDA: LOGO */}
                {/* Le puse un margen derecho grande para que NADIE se le pegue */}
                <div className="logo" style={{ marginRight: '60px', flexShrink: 0 }}>
                    <h1 style={{ margin: 0, fontSize: '1.8rem', letterSpacing: '-1px' }}>TechStore</h1>
                </div>

                {/* 2. SECCIÓN CENTRAL: MENÚ DE NAVEGACIÓN */}
                {/* Usamos flex-grow para que ocupe el espacio disponible pero ordenado */}
                <nav className="main-nav" style={{ flexGrow: 1 }}>
                    <ul className="nav-list" style={{
                        display: 'flex',
                        gap: '30px', // MÁS separación entre "Inicio", "Productos", etc.
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        justifyContent: 'flex-start' // Alineados a la izquierda (pero después del logo)
                    }}>
                        <li>
                            <a
                                href="#inicio"
                                className={currentPage === 'inicio' ? 'active' : ''}
                                onClick={(e) => { e.preventDefault(); onPageChange('inicio'); }}
                                style={{ textDecoration: 'none', fontWeight: '500', fontSize: '1rem', transition: 'color 0.3s' }}
                            >
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a
                                href="#productos"
                                className={currentPage === 'productos' ? 'active' : ''}
                                onClick={(e) => { e.preventDefault(); onPageChange('productos'); }}
                                style={{ textDecoration: 'none', fontWeight: '500', fontSize: '1rem', transition: 'color 0.3s' }}
                            >
                                Productos
                            </a>
                        </li>
                        <li>
                            <a
                                href="#nosotros"
                                className={currentPage === 'nosotros' ? 'active' : ''}
                                onClick={(e) => { e.preventDefault(); onPageChange('nosotros'); }}
                                style={{ textDecoration: 'none', fontWeight: '500', fontSize: '1rem', transition: 'color 0.3s' }}
                            >
                                Nosotros
                            </a>
                        </li>
                        <li>
                            <a
                                href="#blogs"
                                className={currentPage === 'blogs' ? 'active' : ''}
                                onClick={(e) => { e.preventDefault(); onPageChange('blogs'); }}
                                style={{ textDecoration: 'none', fontWeight: '500', fontSize: '1rem', transition: 'color 0.3s' }}
                            >
                                Blogs
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contacto"
                                className={currentPage === 'contacto' ? 'active' : ''}
                                onClick={(e) => { e.preventDefault(); onPageChange('contacto'); }}
                                style={{ textDecoration: 'none', fontWeight: '500', fontSize: '1rem', transition: 'color 0.3s' }}
                            >
                                Contacto
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* 3. SECCIÓN DERECHA: USUARIO Y CARRITO */}
                <div className="header-actions" style={{ flexShrink: 0, marginLeft: '20px' }}>
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                            {/* SALUDO DE USUARIO */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                borderRight: '2px solid rgba(255,255,255,0.4)',
                                paddingRight: '20px',
                                marginRight: '15px'
                            }}>
                                <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Bienvenido,</span>
                                <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{user.name}</span>
                            </div>

                            {/* BOTONES SALIR/PANEL */}
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {user.role === 'admin' && (
                                    <button
                                        onClick={() => onPageChange('admin')}
                                        style={{
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                            border: '1px solid white',
                                            background: 'rgba(255,255,255,0.1)',
                                            color: 'white',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Panel
                                    </button>
                                )}

                                <button
                                    onClick={onLogout}
                                    style={{
                                        padding: '8px 12px',
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontWeight: '600'
                                    }}
                                >
                                    Salir
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            className="login-button"
                            onClick={() => onPageChange('login')}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '50px',
                                border: 'none',
                                backgroundColor: 'white',
                                color: '#004cff',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            Iniciar Sesión
                        </button>
                    )}

                    <button
                        className="cart-button"
                        onClick={onCartToggle}
                        style={{ marginLeft: '15px' }}
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