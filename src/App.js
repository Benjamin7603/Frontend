import { useState, useEffect } from 'react';
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

// Importar datos
import { products, blogPosts } from './data/products';

// Importar CSS
import './styles/App.css';

function App() {
    // 1. ESTADO DE USUARIO (CON PERSISTENCIA)
    // Busca en la memoria del navegador si ya hay alguien logueado
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('techstore_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // 2. ESTADO DE LA PÁGINA
    // Si es admin, lo manda al panel. Si es cliente, al inicio.
    const [currentPage, setCurrentPage] = useState(() => {
        if (localStorage.getItem('techstore_user')) {
            const user = JSON.parse(localStorage.getItem('techstore_user'));
            return user.role === 'admin' ? 'admin' : 'inicio';
        }
        return 'inicio';
    });

    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null);

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
        // Limpiamos selecciones al cambiar de página principal
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

    // --- LOGIN / LOGOUT (CON PERSISTENCIA) ---
    const handleLogin = (user) => {
        setCurrentUser(user);
        // Guardamos en el navegador
        localStorage.setItem('techstore_user', JSON.stringify(user));

        if (user.role === 'admin') {
            setCurrentPage('admin');
        } else {
            setCurrentPage('inicio');
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        // Borramos del navegador
        localStorage.removeItem('techstore_user');
        setCurrentPage('login');
    };

    // --- RENDERIZADO DE PÁGINAS ---
    const renderPage = () => {
        // VISTA: Detalle de Producto
        if (selectedProduct) {
            return (
                <ProductDetail
                    product={selectedProduct}
                    onAddToCart={addToCart}
                    onBackClick={() => handlePageChange('productos')}
                />
            );
        }

        // VISTA: Detalle de Blog (AQUÍ ESTÁ EL ARREGLO DEL BOTÓN VOLVER)
        if (selectedBlog) {
            return (
                <BlogDetail
                    blog={selectedBlog}
                    onBackClick={() => handlePageChange('blogs')}
                />
            );
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

            case 'login':
                return <Login onPageChange={handlePageChange} onLogin={handleLogin} />;

            case 'registro':
                return <Register onPageChange={handlePageChange} />;

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
                user={currentUser}
                onLogout={handleLogout}
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