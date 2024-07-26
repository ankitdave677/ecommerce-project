import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

function ProductList() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        console.log('Fetching all products...');
        axios.get('http://localhost:3001/api/products')
            .then(response => {
                console.log('Products fetched:', response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                console.log('Error details:', error.response);
            });
    }, []);

    return (
        <div className="product-list">
            {products.length > 0 ? (
                products.map(product => (
                    <div key={product._id} className="product-item">
                        <h3><Link to={`/product/${product._id}`}>{product.name}</Link></h3>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <img src={product.imageUrl} alt={product.name} />
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))
            ) : (
                <p>No products available</p>
            )}
        </div>
    );
}

export default ProductList;
