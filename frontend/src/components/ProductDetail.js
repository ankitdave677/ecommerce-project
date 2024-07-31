import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log(`Fetching product with id ${id}`);
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/products/${id}`);
                console.log('Product fetched:', response.data);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, parseInt(quantity));
            navigate('/cart');
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail-container">
            <div className="product-image">
                {product.imageUrl ? (
                    <img src={`${process.env.REACT_APP_BASE_URL}/${product.imageUrl}`} alt={product.name} />
                ) : (
                    <p>No image available</p>
                )}
            </div>
            <div className="product-info">
                <h1>{product.name}</h1>
                {product.brand && <p className="product-brand">{product.brand}</p>}
                {product.rating && product.reviews && (
                    <div className="product-rating">
                        <p>{product.rating} Stars ({product.reviews} Reviews)</p>
                    </div>
                )}
                <p className="product-price">${product.price}</p>
                <p className="product-description">{product.description}</p>
                {product.category && <p>Category: {product.category.name}</p>}
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
                    onClick={handleAddToCart} 
                    disabled={product.stock === 0}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductDetail;
