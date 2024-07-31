import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CategoryPage.css';

function CategoryPage() {
    const { categoryId } = useParams();
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/categories/${categoryId}`)
            .then(response => setCategory(response.data))
            .catch(error => console.error('Error fetching category:', error));

        axios.get(`${process.env.REACT_APP_BASE_URL}/api/products?category=${categoryId}`)
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, [categoryId]);

    return (
        <div className="category-page">
            <h2>{category.name}</h2>
            <div className="product-list">
                {products.map(product => (
                    <div key={product._id} className="product-item">
                        <h3><Link to={`/product/${product._id}`}>{product.name}</Link></h3>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        {product.imageUrl && <img src={`${process.env.REACT_APP_BASE_URL}/${product.imageUrl}`} alt={product.name} />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryPage;
