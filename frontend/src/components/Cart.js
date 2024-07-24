import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext'; 

function Cart() {
  const { cartItems } = useContext(CartContext);
  
  return (
    <div>
      <h2>Your Cart</h2>
      {/* Render cart items */}
    </div>
  );
}

export default Cart;
