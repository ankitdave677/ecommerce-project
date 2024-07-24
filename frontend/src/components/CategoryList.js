import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CategoryList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    return (
        <div className="category-list">
            {categories.map(category => (
                <div key={category._id} className="category-item">
                    <h2>{category.name}</h2>
                </div>
            ))}
        </div>
    );
}

export default CategoryList;
