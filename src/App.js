import { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartPanel from './components/Cart/CartPanel';
import ProductDetail from './components/Products/ProductDetail';
import BlogDetail from './components/Blog/BlogDetail';

// Importar páginas
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';

// Importar datos locales (si se usan de respaldo)
import { products, blogPosts } from './data/products';

import './styles/App.css';

function App() {
    // ESTADOS
    const [currentPage, setCurrentPage] = useState('inicio');
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null);

    // ESTADO NUEVO: Usuario Logueado (null = nadie)
    const [currentUser, setCurrentUser] = useState(null);

    // --- FUNCIONES DE CARRITO ---
    const addToCart = (id, name, price) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { id, name, price, quantity: 1 }];
        });
    };
    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };
    const clearCart = () => setCart([]);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    const handleCartToggle = () => setIsCartOpen(!isCartOpen);
    const handleCloseCart = () => setIsCartOpen(false);

    // --- NAVEGACIÓN ---
    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (page !== 'product-detail') setSelectedProduct(null);
        if (page !== 'blog-detail') setSelectedBlog(null);
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setCurrentPage('product-detail');
    };

    const handleBlogClick = (blog) => {
        setSelectedBlog(blog);
        setCurrentPage('blog-detail');
    };

    // --- LOGIN / LOGOUT ---
    const handleLogin = (user) => {
        setCurrentUser(user); // Guardamos al usuario

        // Redirección inteligente según rol
        if (user.role === 'admin') {
            setCurrentPage('admin');
        } else {
            setCurrentPage('inicio');
        }
    };

    const handleLogout = () => {
        setCurrentUser(null); // Borramos usuario
        setCurrentPage('login'); // Mandamos al login
    };

    // --- RENDERIZADO DE PÁGINAS ---
    const renderPage = () => {
        // Vistas de Detalle
        if (selectedProduct) {
            return (
                <ProductDetail
                    product={selectedProduct}
                    onAddToCart={addToCart}
                    onBackClick={() => handlePageChange('productos')}
                />
            );
        }
        if (selectedBlog) {
            return <BlogDetail blog={selectedBlog} />;
        }

        // Vistas Principales
        switch (currentPage) {
            case 'inicio':
                return (
                    <Home
                        onProductClick={handleProductClick}
                        onAddToCart={addToCart}
                        onPageChange={handlePageChange}
                    />
                );
            case 'productos':
                return (
                    <Products
                        onProductClick={handleProductClick}
                        onAddToCart={addToCart}
                    />
                );
            case 'nosotros': return <About />;
            case 'blogs': return <Blogs blogPosts={blogPosts} onBlogClick={handleBlogClick} />;
            case 'contacto': return <Contact />;

            // Pasamos onLogin a Login
            case 'login':
                return <Login onPageChange={handlePageChange} onLogin={handleLogin} />;

            case 'registro':
                return <Register onPageChange={handlePageChange} />;

            // Pasamos onLogout a Admin
            case 'admin':
                return <Admin onPageChange={handlePageChange} onLogout={handleLogout} />;

            default:
                return <Home onProductClick={handleProductClick} onAddToCart={addToCart} onPageChange={handlePageChange} />;
        }
    };

    return (
        <div className="App">
            <Header
                currentPage={currentPage}
                onPageChange={handlePageChange}
                cartCount={cartCount}
                onCartToggle={handleCartToggle}
                user={currentUser}   // <--- Pasamos el usuario al Header
                onLogout={handleLogout} // <--- Pasamos la función de salir
            />

            <main>
                {renderPage()}
            </main>

            <Footer />

            <CartPanel
                cart={cart}
                onRemoveFromCart={removeFromCart}
                onClearCart={clearCart}
                isOpen={isCartOpen}
                onClose={handleCloseCart}
            />
        </div>
    );
}

export default App;