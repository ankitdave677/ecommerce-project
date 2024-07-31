import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function CartPage() {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.length > 0 ? (
                cartItems.map(item => (
                    <div key={item._id}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>${item.price}</p>
                        <p>
                            Quantity: 
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                                min="1"
                            />
                        </p>
                        <button onClick={() => removeFromCart(item._id)}>Remove</button>
                    </div>
                ))
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
}

export default CartPage;
