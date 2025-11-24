import React from 'react';
import '../../styles/ProductDetail.css';

const ProductDetail = ({ product, onAddToCart, onBackClick }) => {

    // Si no hay producto seleccionado, mostramos error o cargando
    if (!product) {
        return (
            <div className="product-detail">
                <button className="back-button" onClick={onBackClick}>
                    ← Volver a Productos
                </button>
                <div className="error-message">
                    <h2>Producto no encontrado</h2>
                    <p>El producto que buscas no está disponible.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="product-detail">
            {/* Botón para regresar al catálogo */}
            <button className="back-button" onClick={onBackClick}>
                ← Volver a Productos
            </button>

            <div className="product-detail-content">
                <div className="product-detail-image">
                    {/* Placeholder por si la imagen viene vacía o rota */}
                    <img
                        src={product.image || "https://via.placeholder.com/400"}
                        alt={product.name}
                    />
                </div>

                <div className="product-detail-info">
                    <h1>{product.name}</h1>

                    <p className="product-detail-description">
                        {product.description || "Sin descripción disponible."}
                    </p>

                    <div className="product-detail-price">
                        ${product.price?.toLocaleString()}
                    </div>

                    <button
                        className="add-to-cart-large"
                        onClick={() => onAddToCart(product.id, product.name, product.price)}
                    >
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;