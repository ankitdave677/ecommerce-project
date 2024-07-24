import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/categories')
            .then(response => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching categories');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="category-list">
            {categories.length > 0 ? (
                categories.map(category => (
                    <div key={category._id} className="category-item">
                        <h2>{category.name}</h2>
                    </div>
                ))
            ) : (
                <div>No categories available</div>
            )}
        </div>
    );
}

export default CategoryList;
