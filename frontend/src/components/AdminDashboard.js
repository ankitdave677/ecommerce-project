import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', stock: '', imageUrl: '' });
    const [newCategory, setNewCategory] = useState({ name: '' });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/products`);
        setProducts(response.data);
    };

    const fetchCategories = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/categories`);
        setCategories(response.data);
    };

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/products`, newProduct);
        fetchProducts();
    };

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/categories`, newCategory);
        fetchCategories();
    };

    const handleProductDelete = async (id) => {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/products/${id}`);
        fetchProducts();
    };

    const handleCategoryDelete = async (id) => {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/categories/${id}`);
        fetchCategories();
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="admin-section">
                <h3>Products</h3>
                <form onSubmit={handleProductSubmit}>
                    <label>Name</label>
                    <input type="text" name="name" value={newProduct.name} onChange={handleProductChange} required />
                    <label>Price</label>
                    <input type="number" name="price" value={newProduct.price} onChange={handleProductChange} required />
                    <label>Category</label>
                    <select name="category" value={newProduct.category} onChange={handleProductChange} required>
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                    <label>Stock</label>
                    <input type="number" name="stock" value={newProduct.stock} onChange={handleProductChange} required />
                    <label>Image URL</label>
                    <input type="text" name="imageUrl" value={newProduct.imageUrl} onChange={handleProductChange} />
                    <button type="submit">Add Product</button>
                </form>
                <div className="product-list">
                    {products.map(product => (
                        <div key={product._id} className="product-item">
                            <h4>{product.name}</h4>
                            <p>Price: ${product.price}</p>
                            <p>Category: {categories.find(cat => cat._id === product.category)?.name}</p>
                            <p>Stock: {product.stock}</p>
                            <button onClick={() => handleProductDelete(product._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="admin-section">
                <h3>Categories</h3>
                <form onSubmit={handleCategorySubmit}>
                    <label>Name</label>
                    <input type="text" name="name" value={newCategory.name} onChange={handleCategoryChange} required />
                    <button type="submit">Add Category</button>
                </form>
                <div className="category-list">
                    {categories.map(category => (
                        <div key={category._id} className="category-item">
                            <h4>{category.name}</h4>
                            <button onClick={() => handleCategoryDelete(category._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
