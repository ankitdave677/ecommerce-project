import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import './HomePage.css';

function HomePage() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Fetching categories...');
        axios.get(process.env.REACT_APP_BASE_URL + '/api/categories')
            .then(response => {
                console.log('Categories fetched:', response.data);
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });

        console.log('Fetching featured products...');
        axios.get(process.env.REACT_APP_BASE_URL + '/api/products?limit=5')
            .then(response => {
                console.log('Featured products fetched:', response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching featured products:', error);
            });
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product, 1); 
        navigate('/cart'); 
    };

    return (
        <div className="home-page">
            <h2>Product Categories</h2>
            <div className="categories">
                {categories.length > 0 ? (
                    categories.map(category => (
                        <Link to={`/categories/${category._id}`} key={category._id} className="category-item">
                            {category.name}
                        </Link>
                    ))
                ) : (
                    <p>No categories available</p>
                )}
            </div>
            <h2>Featured Products</h2>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product._id} className="product-item">
                            <h3><Link to={`/product/${product._id}`}>{product.name}</Link></h3>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                            {product.imageUrl && <img src={`${process.env.REACT_APP_BASE_URL}/${product.imageUrl}`} alt={product.name} />}
                            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </div>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;
