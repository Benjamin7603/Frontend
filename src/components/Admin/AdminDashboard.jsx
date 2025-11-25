import React from 'react';

const AdminDashboard = ({ totalProducts, totalUsers, isOnline }) => {
    return (
        <div className="dashboard-container">
            <div className="admin-header">
                <div>
                    <h2>Dashboard General</h2>
                    <p className="subtitle">Resumen de estadísticas de TechStore</p>
                </div>
            </div>

            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>

                {/* TARJETA 1: PRODUCTOS */}
                <div className="stat-card" style={cardStyle}>
                    <div className="stat-icon" style={{...iconStyle, backgroundColor: '#e7f1ff', color: '#0d6efd'}}>📦</div>
                    <div className="stat-info">
                        <h3 style={numberStyle}>{totalProducts || 0}</h3>
                        <p style={labelStyle}>Total Productos</p>
                    </div>
                </div>

                {/* TARJETA 2: USUARIOS */}
                <div className="stat-card" style={cardStyle}>
                    <div className="stat-icon" style={{...iconStyle, backgroundColor: '#fff3cd', color: '#ffc107'}}>👥</div>
                    <div className="stat-info">
                        <h3 style={numberStyle}>{totalUsers || 0}</h3>
                        <p style={labelStyle}>Usuarios Registrados</p>
                    </div>
                </div>

                {/* TARJETA 3: VENTAS (Solo se muestran si hay sistema) */}
                <div className="stat-card" style={cardStyle}>
                    <div className="stat-icon" style={{...iconStyle, backgroundColor: '#d1e7dd', color: '#198754'}}>💰</div>
                    <div className="stat-info">
                        <h3 style={numberStyle}>{isOnline ? "$1.250.990" : "$0"}</h3>
                        <p style={labelStyle}>Ventas Totales</p>
                    </div>
                </div>

                {/* TARJETA 4: ESTADO DEL SISTEMA (DINÁMICO) */}
                <div className="stat-card" style={cardStyle}>
                    {/* Lógica del Semáforo */}
                    <div className="stat-icon" style={{
                        ...iconStyle,
                        backgroundColor: isOnline ? '#d1e7dd' : '#f8d7da',
                        color: isOnline ? '#198754' : '#dc3545'
                    }}>
                        {isOnline ? '🟢' : '🔴'}
                    </div>

                    <div className="stat-info">
                        <h3 style={{
                            ...numberStyle,
                            fontSize: '1.2rem',
                            color: isOnline ? '#198754' : '#dc3545' // Verde o Rojo
                        }}>
                            {isOnline ? 'En Línea' : 'Fuera de Línea'}
                        </h3>
                        <p style={labelStyle}>
                            {isOnline ? 'Servidor Conectado' : 'Backend Apagado'}
                        </p>
                    </div>
                </div>

            </div>

            <div style={{ marginTop: '40px', padding: '30px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h3 style={{ color: '#003366' }}>¡Bienvenido al Panel de Control!</h3>
                <p style={{ color: '#666', marginTop: '10px' }}>
                    {isOnline
                        ? "El sistema está funcionando correctamente. Puedes gestionar inventario y usuarios."
                        : "⚠️ ATENCIÓN: No se detecta conexión con el Backend (Java). Verifica que el servidor esté corriendo en IntelliJ."
                    }
                </p>
            </div>

        </div>
    );
};

// Estilos
const cardStyle = {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    transition: 'transform 0.2s'
};

const iconStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem'
};

const numberStyle = {
    margin: 0,
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333'
};

const labelStyle = {
    margin: 0,
    color: '#888',
    fontSize: '0.9rem'
};

export default AdminDashboard;