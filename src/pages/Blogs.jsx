import React from 'react';
import '../styles/Blogs.css';

const Blogs = ({ blogPosts, onBlogClick }) => {
    return (
        <div className="blogs-page">
            <div className="blogs-header">
                <h1>Nuestros Blogs</h1>
                <p>Descubre las últimas noticias y tendencias en tecnología</p>
            </div>

            <div className="blogs-container">
                {/* Mapeamos los blogs */}
                {blogPosts.map((blog) => (
                    <div key={blog.id} className="blog-card">
                        <div className="blog-image">
                            {/* Agregamos una imagen de respaldo por si falla la principal */}
                            <img
                                src={blog.image || "https://via.placeholder.com/400x300"}
                                alt={blog.title}
                            />
                        </div>

                        <div className="blog-content">
                            <h3 className="blog-title">{blog.title}</h3>
                            <p className="blog-excerpt">{blog.excerpt}</p>
                            <p className="blog-date">Publicado: {blog.date}</p>

                            <button
                                className="read-more-btn"
                                // CORRECCIÓN CLAVE: Pasamos 'blog' (el objeto), NO 'index'
                                onClick={() => onBlogClick(blog)}
                            >
                                Leer Más
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;