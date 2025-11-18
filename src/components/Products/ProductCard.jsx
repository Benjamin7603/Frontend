const ProductCard = ({ product, onProductClick, onAddToCart }) => {
    return (
        <div 
            className="product-card" 
            onClick={() => onProductClick(product.id)}
        >
            <div className="product-image">
                <img src={product.images[0]} alt={product.name} />
            </div>
            <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-price">${product.price.toLocaleString()}</div>
                <button 
                    className="btn add-to-cart" 
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product.id, product.name, product.price);
                    }}
                >
                    Agregar al Carrito
                </button>
            </div>
        </div>
    );
};

export default ProductCard;