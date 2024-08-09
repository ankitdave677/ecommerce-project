import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CategoryPage.css';

function CategoryPage() {
    const { id } = useParams();
    console.log(useParams());
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/categories/${id}`)
            .then(response => setCategory(response.data))
            .catch(error => console.error('Error fetching category:', error));
            //            http://localhost:3001/api/categories/66a29074724ae190c00fdaef/products
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/categories/${id}/products`)
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, [id]);

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
