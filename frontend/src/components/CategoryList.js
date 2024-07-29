import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CategoryList() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`/api/categories/${id}`)
            .then(response => setProducts(response.data.products))
            .catch(error => console.error('Error fetching category products:', error));
    }, [id]);

    return (
        <div className="category-list">
            {products.map(product => (
                <div key={product._id} className="product-item">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                    <img src={ process.env.REACT_APP_BASE_URL + "/" + product.imageUrl} alt={product.name} />
                </div>
            ))}
        </div>
    );
}

export default CategoryList;
