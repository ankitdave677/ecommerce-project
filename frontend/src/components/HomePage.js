import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log('Fetching products...');
        axios.get('http://localhost:3001/api/products?limit=5')
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
        <div className="homepage">
            <h2>Featured Products</h2>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product._id} className="product-item">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                            <img src={ process.env.REACT_APP_BASE_URL + "/" + product.imageUrl} alt={product.name} />
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
