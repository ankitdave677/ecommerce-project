import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CategoryPage.css';

function CategoryPage() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/categories/${id}/products`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, [id]);

    return (
        <div className="category-page">
            <h2>Category Products</h2>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product._id} className="product-item">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                            {product.imageUrl && <img src={`${process.env.REACT_APP_BASE_URL}/${product.imageUrl}`} alt={product.name} />}
                        </div>
                    ))
                ) : (
                    <p>No products available in this category</p>
                )}
            </div>
        </div>
    );
}

export default CategoryPage;
