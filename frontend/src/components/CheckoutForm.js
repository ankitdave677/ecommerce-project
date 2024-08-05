import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutForm.css';

function CheckoutForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        postalCode: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Normally, you would send this data to the server here
        navigate('/order-summary', { state: { formData } });
    };

    return (
        <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            <label>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            <label>Postal Code</label>
            <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
            <button type="submit">Submit</button>
        </form>
    );
}

export default CheckoutForm;
