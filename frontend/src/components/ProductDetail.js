import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        console.log(`Fetching product with id ${id}`);
        axios.get(`http://localhost:3001/api/products/${id}`)
            .then(response => {
                console.log('Product fetched:', response.data);
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail-container">
            <div className="product-image">
                <img src={`http://localhost:3001/${product.imageUrl}`} alt={product.name} />
            </div>
            <div className="product-info">
                <h1>{product.name}</h1>
                <p className="product-brand">{product.brand}</p>
                <div className="product-rating">
                    <p>{product.rating} Stars ({product.reviews} Reviews)</p>
                </div>
                <p className="product-price">${product.price}</p>
                <p className="product-description">{product.description}</p>
                <div className="product-quantity">
                    <label htmlFor="quantity">Net Qty :</label>
                    <select 
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    >
                        {[...Array(10).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                                {x + 1}
                            </option>
                        ))}
                    </select>
                </div>
                <p className="product-stock">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                <button 
                    className="add-to-cart-button"
                    onClick={() => addToCart({ ...product, quantity })}
                    disabled={product.stock === 0}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductDetail;
