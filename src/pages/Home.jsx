import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService'; // <-- Importamos el servicio
import '../styles/Home.css';

// Ya no recibimos 'products' por props, porque los vamos a buscar nosotros mismos
const Home = ({ onProductClick, onAddToCart, onPageChange }) => {

    // 1. Estado para guardar los productos que vienen de Java
    const [dbProducts, setDbProducts] = useState([]);

    // 2. Efecto para cargar los datos al entrar a la página
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getAllProducts();
            setDbProducts(data);
        };
        fetchProducts();
    }, []);

    // Tomamos los primeros 3 productos de la base de datos
    const featuredProducts = dbProducts.slice(0, 3);

    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Bienvenido a TechStore</h1>
                    <p className="hero-subtitle">
                        Tu tienda de tecnología de confianza con los mejores productos al mejor precio.
                        Encuentra lo último en tecnología con nosotros.
                    </p>
                    <button
                        className="hero-button"
                        onClick={() => onPageChange('productos')}
                    >
                        Ver Productos
                    </button>
                </div>
            </section>

            <section className="featured-section">
                <div className="container">
                    <h2 className="section-title">Productos Destacados</h2>

                    {/* LÓGICA DE VISUALIZACIÓN */}
                    {dbProducts.length === 0 ? (
                        // Mantenemos el estilo del container pero avisamos que está vacío
                        <div className="featured-grid" style={{ display: 'block', textAlign: 'center' }}>
                            <p style={{ fontSize: '1.2rem', color: '#666' }}>
                            </p>
                        </div>
                    ) : (
                        // Tu diseño original intacto
                        <div className="featured-grid">
                            {featuredProducts.map((product, index) => (
                                <div key={product.id || index} className="featured-card">
                                    <div className="featured-image">
                                        {/* Agregamos un placeholder por si la imagen viene rota o vacía del backend */}
                                        <img
                                            src={product.image || "https://via.placeholder.com/300"}
                                            alt={product.name}
                                        />
                                    </div>
                                    <div className="featured-info">
                                        <h3>{product.name}</h3>
                                        <p>{product.description}</p>
                                        <div className="featured-price">
                                            ${product.price?.toLocaleString()}
                                        </div>
                                        <div className="featured-actions">
                                            <button
                                                className="btn-secondary"
                                                onClick={() => onProductClick(product)} // Pasamos el producto completo para evitar errores de índice
                                            >
                                                Ver Más
                                            </button>
                                            <button
                                                className="btn-primary"
                                                onClick={() => onAddToCart(product.id, product.name, product.price)}
                                            >
                                                Comprar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;