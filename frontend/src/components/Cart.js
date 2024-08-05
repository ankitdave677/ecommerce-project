import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="cart-page">
            <h2>Shopping Cart</h2>
            {cartItems.length > 0 ? (
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item._id} className="cart-item">
                            <img src={`${process.env.REACT_APP_BASE_URL}/${item.imageUrl}`} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <Link to={`/product/${item._id}`} className="cart-item-name">{item.name}</Link>
                                <p>Qty: 
                                    <select 
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                                    >
                                        {[...Array(10).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <button onClick={() => removeFromCart(item._id)}>Remove From Cart</button>
                                </p>
                            </div>
                            <div className="cart-item-price">
                                ${item.price.toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Your cart is empty</p>
            )}
            {cartItems.length > 0 && (
                <div className="cart-summary">
                    <h3>Subtotal ({cartItems.length} items): ${getTotalPrice()}</h3>
                    <button className="checkout-button" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                </div>
            )}
        </div>
    );
}

export default Cart;
