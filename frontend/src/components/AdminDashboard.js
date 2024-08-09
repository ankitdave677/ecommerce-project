import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '', stock: '', image: null });
    const [newCategory, setNewCategory] = useState({ name: '' });
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/admin-login');
        } else {
            fetchProducts();
            fetchCategories();
        }
    }, [navigate]);

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

    const handleImageChange = (e) => {
        setNewProduct({ ...newProduct, image: e.target.files[0] });
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('description', newProduct.description);
        formData.append('price', newProduct.price);
        formData.append('category', newProduct.category);
        formData.append('stock', newProduct.stock);
        if (newProduct.image) {
            formData.append('image', newProduct.image);
        }

        try {
            if (editingProduct) {
                await axios.put(`${process.env.REACT_APP_BASE_URL}/api/products/${editingProduct._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setEditingProduct(null);
            } else {
                await axios.post(`${process.env.REACT_APP_BASE_URL}/api/products`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            fetchProducts();
        } catch (error) {
            console.error('Failed to save product', error);
        }

        setNewProduct({ name: '', description: '', price: '', category: '', stock: '', image: null });
    };

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await axios.put(`${process.env.REACT_APP_BASE_URL}/api/categories/${editingCategory._id}`, newCategory);
                setEditingCategory(null);
            } else {
                await axios.post(`${process.env.REACT_APP_BASE_URL}/api/categories`, newCategory);
            }
            setNewCategory({ name: '' });
            fetchCategories();
        } catch (error) {
            console.error('There was an error with the category operation!', error);
        }
    };

    const handleProductEdit = (product) => {
        setNewProduct({
            ...product,
            image: null, // Reset image to allow new upload
        });
        setEditingProduct(product);
    };

    const handleCategoryEdit = (category) => {
        setNewCategory(category);
        setEditingCategory(category);
    };

    const handleProductDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Failed to delete product', error);
        }
    };

    const handleCategoryDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/categories/${id}`);
            fetchCategories();
        } catch (error) {
            console.error('Failed to delete category', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>

            <div className="admin-section">
                <h3>Products</h3>
                <form onSubmit={handleProductSubmit} encType="multipart/form-data">
                    <label>Name</label>
                    <input type="text" name="name" value={newProduct.name} onChange={handleProductChange} required />
                    <label>Description</label>
                    <textarea name="description" value={newProduct.description} onChange={handleProductChange} required />
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
                    <label>Image</label>
                    <input type="file" name="image" onChange={handleImageChange} accept="image/*" />
                    <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
                </form>

                <div className="product-list">
                    {products.map(product => (
                        <div key={product._id} className="product-item">
                            <h4>{product.name}</h4>
                            <p>Description: {product.description}</p>
                            <p>Price: ${product.price}</p>
                            <p>Category: {categories.find(cat => cat._id === product.category)?.name}</p>
                            <p>Stock: {product.stock}</p>
                            {product.imageUrl && (
                                <img 
                                    src={`${process.env.REACT_APP_BASE_URL}/${product.imageUrl}`} 
                                    alt={product.name} 
                                    style={{ maxWidth: '100px', maxHeight: '100px' }} 
                                />
                            )}
                            <button onClick={() => handleProductEdit(product)}>Edit</button>
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
                    <button type="submit">{editingCategory ? 'Update Category' : 'Add Category'}</button>
                </form>

                <div className="category-list">
                    {categories.map(category => (
                        <div key={category._id} className="category-item">
                            <h4>{category.name}</h4>
                            <button onClick={() => handleCategoryEdit(category)}>Edit</button>
                            <button onClick={() => handleCategoryDelete(category._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
