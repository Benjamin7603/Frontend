import React from 'react';

const AdminProducts = ({
                           products,
                           onDeleteProduct,
                           onShowAddForm,
                           onShowEditForm
                       }) => {
    return (
        <div className="admin-products-container">
            {/* Encabezado elegante con el botón */}
            <div className="admin-header">
                <div>
                    <h2>Gestión de Productos</h2>
                    <p className="subtitle">Administra el inventario de la tienda (Base de Datos)</p>
                </div>
                <button
                    className="btn-add-product"
                    onClick={onShowAddForm}
                >
                    + Nuevo Producto
                </button>
            </div>

            {/* Contenedor de la tabla con sombra */}
            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th width="80">Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                        <th width="150">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>

                    {Array.isArray(products) && products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <div className="img-thumbnail-wrapper">
                                        <img
                                            // Corrección para Java: Usamos product.image directo
                                            src={product.image || 'https://via.placeholder.com/50'}
                                            alt={product.name}
                                        />
                                    </div>
                                </td>
                                <td className="fw-bold">{product.name}</td>
                                <td className="price-tag">${product.price?.toLocaleString()}</td>
                                <td>
                                    <div className="description-truncate">
                                        {product.description}
                                    </div>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="btn-icon edit"
                                            onClick={() => onShowEditForm(product)}
                                            title="Editar"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            className="btn-icon delete"
                                            onClick={() => onDeleteProduct(product.id)}
                                            title="Eliminar"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="empty-state">
                                📭 No hay productos en la Base de Datos.
                                <br/>
                                ¡Agrega el primero con el botón de arriba!
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;