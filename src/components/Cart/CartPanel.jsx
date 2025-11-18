import React from 'react';
import '../../styles/CartPanel.css';

const CartPanel = ({ cart, onRemoveFromCart, onClearCart, isOpen, onClose }) => {
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    if (!isOpen) return null;

    return (
        <div className="cart-overlay" onClick={onClose}>
            <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Tu Carrito ({cart.reduce((total, item) => total + item.quantity, 0)})</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="cart-content">
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <p>Tu carrito está vacío</p>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {cart.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <div className="item-info">
                                            <h4 className="item-name">{item.name}</h4>
                                            <p className="item-price">
                                                ${item.price.toLocaleString()} x {item.quantity}
                                            </p>
                                            <p className="item-total">
                                                Total: ${(item.price * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                        <button 
                                            className="remove-btn"
                                            onClick={() => onRemoveFromCart(item.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-total">
                                <h3>Total: ${calculateTotal().toLocaleString()}</h3>
                            </div>

                            <div className="cart-actions">
                                <button 
                                    className="clear-btn"
                                    onClick={onClearCart}
                                >
                                    Vaciar Carrito
                                </button>
                                <button 
                                    className="checkout-btn"
                                    onClick={() => alert('¡Gracias por tu compra!')}
                                >
                                    Finalizar Compra
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartPanel;