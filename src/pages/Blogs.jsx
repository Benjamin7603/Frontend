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
                {blogPosts.map((blog, index) => (
                    <div key={blog.id} className="blog-card">
                        <div className="blog-image">
                            <img src={blog.image} alt={blog.title} />
                        </div>
                        
                        <div className="blog-content">
                            <h3 className="blog-title">{blog.title}</h3>
                            <p className="blog-excerpt">{blog.excerpt}</p>
                            <p className="blog-date">Publicado: {blog.date}</p>
                            
                            <button 
                                className="read-more-btn"
                                onClick={() => onBlogClick(index)}
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