import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Cart() {
  const { cartItems } = useContext(CartContext);
  
  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in the cart</p>
      )}
    </div>
  );
}

export default Cart;
