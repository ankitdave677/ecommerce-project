import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import './CheckoutPage.css';

function CheckoutPage() {
    const { cartItems } = useContext(CartContext);
    const [userInfo, setUserInfo] = useState({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        paymentMethod: 'Credit Card',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User Info:', userInfo);
        console.log('Cart Items:', cartItems);
        alert('Checkout successful!');
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="checkout-page">
            <form onSubmit={handleSubmit} className="checkout-form">
                <h2>Checkout</h2>
                <label>Name</label>
                <input type="text" name="name" value={userInfo.name} onChange={handleChange} required />
                <label>Address</label>
                <input type="text" name="address" value={userInfo.address} onChange={handleChange} required />
                <label>City</label>
                <input type="text" name="city" value={userInfo.city} onChange={handleChange} required />
                <label>Postal Code</label>
                <input type="text" name="postalCode" value={userInfo.postalCode} onChange={handleChange} required />
                <label>Country</label>
                <input type="text" name="country" value={userInfo.country} onChange={handleChange} required />
                <label>Payment Method</label>
                <select name="paymentMethod" value={userInfo.paymentMethod} onChange={handleChange} required>
                    <option value="Credit Card">Credit Card</option>
                </select>
                {userInfo.paymentMethod === 'Credit Card' && (
                    <div className="credit-card-info">
                        <label>Card Number</label>
                        <input type="text" name="cardNumber" value={userInfo.cardNumber} onChange={handleChange} required />
                        <label>Card Name</label>
                        <input type="text" name="cardName" value={userInfo.cardName} onChange={handleChange} required />
                        <label>Expiry Date</label>
                        <input type="text" name="expiryDate" value={userInfo.expiryDate} onChange={handleChange} placeholder="MM/YY" required />
                        <label>CVV</label>
                        <input type="text" name="cvv" value={userInfo.cvv} onChange={handleChange} required />
                    </div>
                )}
                <button type="submit" className="place-order-button">Place Order</button>
            </form>
            <div className="order-summary">
                <h2>Order Summary</h2>
                <div className="order-items">
                    {cartItems.map(item => (
                        <div key={item._id} className="order-item">
                            <img src={`${process.env.REACT_APP_BASE_URL}/${item.imageUrl}`} alt={item.name} />
                            <div className="order-item-details">
                                <p>{item.name}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <h3>Total: ${getTotalPrice()}</h3>
            </div>
        </div>
    );
}

export default CheckoutPage;
