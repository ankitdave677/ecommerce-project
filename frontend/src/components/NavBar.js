import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function NavBar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URL + '/api/categories')
            .then(response => setCategories(response.data))
     
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    return (
        <nav>
            <h2>Categories</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                {categories.map(category => (
                    <li key={category._id}>
                        <Link to={`/categories/${category._id}`}>{category.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default NavBar;
