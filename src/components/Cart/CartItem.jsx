const CartItem = ({ item, onRemoveFromCart }) => {
    return (
        <li className="cart-item">
            <div className="cart-item-info">
                <strong>{item.name}</strong>
                <br />
                ${item.price.toLocaleString()} x {item.quantity}
                <div className="cart-item-total">
                    Total: ${(item.price * item.quantity).toLocaleString()}
                </div>
            </div>
            <button 
                className="cart-remove-btn"
                onClick={() => onRemoveFromCart(item.id)}
            >
                <i className="fas fa-trash"></i>
            </button>
        </li>
    );
};

export default CartItem;