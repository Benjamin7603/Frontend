import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSave, onCancel, productToEdit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const formTitle = productToEdit ? 'Editar Producto' : 'Agregar Nuevo Producto';

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || '');
      setPrice(productToEdit.price || 0);
      setDescription(productToEdit.description || '');
      // CORRECCIÓN: Usamos 'image' directo, no 'images[0]'
      setImage(productToEdit.image || '');
    } else {
      setName('');
      setPrice(0);
      setDescription('');
      setImage('');
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación simple
    if (!name || !price || !description || !image) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Datos listos para Java
    const productData = {
      name: name,
      price: parseFloat(price),
      description: description,
      image: image, // Enviamos string directo
      category: "General",
      stock: 10
    };

    onSave(productData);
  };

  return (
      <div className="product-form-container">
        <h3>{formTitle}</h3>
        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: '10px' }}>
            <label>Nombre:</label><br/>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required style={{width:'100%'}}/>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Precio:</label><br/>
            <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} required style={{width:'100%'}}/>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>URL Imagen:</label><br/>
            <input type="text" value={image} onChange={(e)=>setImage(e.target.value)} placeholder="http://..." required style={{width:'100%'}}/>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Descripción:</label><br/>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} required style={{width:'100%', height:'80px'}}/>
          </div>

          <div className="form-actions" style={{display:'flex', gap:'10px', marginTop:'20px'}}>
            <button type="submit" className="btn-primary">Guardar en BD</button>
            <button type="button" onClick={onCancel} className="btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>
  );
};

export default ProductForm;