import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductList.css';
import { CartContext } from '../context/CartContext';

function ProductList({ categoryId }) {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Fetching products...');
        const url = categoryId
            ? `${process.env.REACT_APP_BASE_URL}/api/products?category=${categoryId}`
            : `${process.env.REACT_APP_BASE_URL}/api/products`;
        axios.get(url)
            .then(response => {
                console.log('Products fetched:', response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                console.log('Error details:', error.response);
            });
    }, [categoryId]);

    const handleAddToCart = (product) => {
        addToCart(product, 1);
        navigate('/cart');
    };

    return (
        <div class="container">
            <div className="product-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product._id} className="product-item">
                            <h3><Link to={`/product/${product._id}`}>{product.name}</Link></h3>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                            {product.imageUrl && (
                                <img
                                    src={`${process.env.REACT_APP_BASE_URL}/${product.imageUrl}`}
                                    alt={product.name}
                                />
                            )}
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

export default ProductList;
