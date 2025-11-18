import React, { useState, useEffect } from 'react';



const ProductForm = ({ onSave, onCancel, productToEdit }) => {
  // Estados para cada campo del formulario
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  // Título del formulario
  const formTitle = productToEdit ? 'Editar Producto' : 'Agregar Nuevo Producto'

  // Si estamos editando, rellena el formulario con los datos del producto.
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || '');
      setPrice(productToEdit.price || 0);
      setDescription(productToEdit.description || '');
      setImage(productToEdit.images && productToEdit.images[0] ? productToEdit.images[0] : '');
    } else {
      setName('');
      setPrice(0);
      setDescription('');
      setImage('');
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !description || !image) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const productData = {
      name: name,
      price: parseInt(price, 10), // Aseguramos que el precio sea un número
      description: description,
      images: [image],
      // Si estamos editando, mantenemos el ID. Si no, onSave lo generará
      id: productToEdit ? productToEdit.id : undefined, 
      // Si estamos editando, mantenemos el resto de datos
      ...(productToEdit ? productToEdit : {})
    };
    
    // Sobreescribimos los datos actualizados
    if (productToEdit) {
      productData.fullDescription = productToEdit.fullDescription;
      productData.features = productToEdit.features;
    }

    onSave(productData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      border: '1px solid #ccc', 
      padding: '20px', 
      borderRadius: '8px', 
      marginBottom: '20px' 
    }}>
      <h4>{formTitle}</h4>
      
      <div style={{ marginBottom: '10px' }}>
        <label>Nombre:</label><br />
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '90%', padding: '5px' }}
        />
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <label>Precio:</label><br />
        <input 
          type="number" 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: '90%', padding: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>URL de Imagen (principal):</label><br />
        <input 
          type="text" 
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={{ width: '90%', padding: '5px' }}
          placeholder="Ej: /imagenes/mi-producto.jpg"
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Descripción (corta):</label><br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '90%', padding: '5px', height: '80px' }}
        />
      </div>

      <button type="submit" className="btn-primary" style={{ marginRight: '10px' }}>
        Guardar
      </button>
      <button type="button" onClick={onCancel} className="btn-warning">
        Cancelar
      </button>
    </form>
  );
};

export default ProductForm;