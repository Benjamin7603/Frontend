const BlogCard = ({ blog, onBlogClick }) => {
    return (
        <div className="blog-card" onClick={() => onBlogClick(blog.id)}>
            <div className="blog-image">
                <img src={blog.image} alt={blog.title} />
            </div>
            <div className="blog-content">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-excerpt">
                    {blog.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                </p>
                <div className="blog-meta">
                    <span><i className="far fa-calendar"></i> {blog.date}</span>
                    <span><i className="far fa-user"></i> {blog.author}</span>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;