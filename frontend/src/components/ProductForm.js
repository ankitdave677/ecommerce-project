import React, { useState } from 'react';
import axios from 'axios';

function ProductForm() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('stock', formData.stock);
        data.append('image', formData.image);

        axios.post('http://localhost:3001/api/products', data)
            .then(response => {
                console.log('Product created:', response.data);
            })
            .catch(error => {
                console.error('There was an error creating the product!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Product Description" required></textarea>
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Product Price" required />
            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Product Category" required />
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Product Stock" required />
            <input type="file" name="image" onChange={handleFileChange} required />
            <button type="submit">Create Product</button>
        </form>
    );
}

export default ProductForm;
