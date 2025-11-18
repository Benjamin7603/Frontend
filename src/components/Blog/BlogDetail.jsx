import React from 'react';
import '../../styles/BlogDetail.css';

const BlogDetail = ({ blog, onBackClick }) => {
    if (!blog) {
        return (
            <div className="blog-detail">
                <button className="back-button" onClick={onBackClick}>
                    ← Volver a Blogs
                </button>
                <div className="error-message">
                    <h2>Blog no encontrado</h2>
                    <p>El blog que buscas no está disponible.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="blog-detail">
            <button className="back-button" onClick={onBackClick}>
                ← Volver a Blogs
            </button>
            
            <div className="blog-detail-content">
                <div className="blog-detail-image">
                    <img src={blog.image} alt={blog.title} />
                </div>
                
                <div className="blog-detail-info">
                    <h1>{blog.title}</h1>
                    <p className="blog-date">Publicado el: {blog.date}</p>
                    <div className="blog-content">
                        <p>{blog.content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;