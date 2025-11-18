import React from 'react';
import '../styles/Home.css';

const Home = ({ products, onProductClick, onAddToCart, onPageChange }) => {
    const featuredProducts = products.slice(0, 3);

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
                    <div className="featured-grid">
                        {featuredProducts.map((product, index) => (
                            <div key={product.id} className="featured-card">
                                <div className="featured-image">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className="featured-info">
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <div className="featured-price">${product.price.toLocaleString()}</div>
                                    <div className="featured-actions">
                                        <button 
                                            className="btn-secondary"
                                            onClick={() => onProductClick(index)}
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
                </div>
            </section>
        </div>
    );
};

export default Home;