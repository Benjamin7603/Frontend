import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService'; // <-- Importamos el servicio
import '../styles/Products.css';


const Products = ({ onProductClick, onAddToCart }) => {

    // 1. Estado para guardar los productos que vienen de Java
    const [dbProducts, setDbProducts] = useState([]);

    // 2. Cargar datos al entrar a la página
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getAllProducts();
            setDbProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <div className="products-page">
            <div className="products-header">
                <h1>Todos Nuestros Productos</h1>
                <p>Encuentra lo último en tecnología al mejor precio</p>
            </div>

            <div className="products-container">
                {/* VALIDACIÓN: Si no hay productos, mostramos un mensaje sutil */}
                {dbProducts.length === 0 ? (
                    <div style={{ textAlign: 'center', width: '100%', padding: '2rem', color: '#666' }}>
                        <p>Cargando productos o catálogo vacío...</p>
                    </div>
                ) : (
                    // MAPEO: Usamos dbProducts en vez de products
                    dbProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-image-container">
                                <img
                                    src={product.image || "https://via.placeholder.com/300"}
                                    alt={product.name}
                                    className="product-image"
                                />
                            </div>

                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-description">{product.description}</p>

                                {/* Usamos el signo ? por si el precio tarda en llegar */}
                                <div className="product-price">${product.price?.toLocaleString()}</div>

                                <div className="product-actions">
                                    <button
                                        className="details-btn"
                                        // CAMBIO IMPORTANTE: Pasamos el objeto 'product' completo, no el 'index'
                                        onClick={() => onProductClick(product)}
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
                    ))
                )}
            </div>
        </div>
    );
};

export default Products;