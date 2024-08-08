import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ThankYouPage.css';

function ThankYouPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderNumber, cartItems, totalPrice } = location.state;

    return (
        <div className="thank-you-page">
            <div className="thank-you-content">
                <h1>Thank you for Placing Order!</h1>
                <p>We've sent the order details to your inbox. Your order will be delivered to your mentioned address in 4-5 business days.</p>
                <div className="order-details">
                    <h2>Order Number: {orderNumber}</h2>
                    <h3>Order Details:</h3>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item._id}>
                                {item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <h3>Total Price: ${totalPrice}</h3>
                </div>
                <button onClick={() => navigate('/')} className="back-home-button">Back Home</button>
            </div>
        </div>
    );
}

export default ThankYouPage;
