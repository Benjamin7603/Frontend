import React from 'react';
import '../styles/Products.css';

const Products = ({ products, onProductClick, onAddToCart }) => {
    return (
        <div className="products-page">
            <div className="products-header">
                <h1>Todos Nuestros Productos</h1>
                <p>Encuentra lo último en tecnología al mejor precio</p>
            </div>

            <div className="products-container">
                {products.map((product, index) => (
                    <div key={product.id} className="product-card">
                        <div className="product-image-container">
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className="product-image"
                            />
                        </div>
                        
                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            
                            <div className="product-price">${product.price.toLocaleString()}</div>
                            
                            <div className="product-actions">
                                <button 
                                    className="details-btn"
                                    onClick={() => onProductClick(index)}
                                >
                                    Ver Detalles
                                </button>
                                <button 
                                    className="add-cart-btn"
                                    onClick={() => onAddToCart(product.id, product.name, product.price)}
                                >
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;