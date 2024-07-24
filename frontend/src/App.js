import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart';
import CategoryList from './components/CategoryList';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="App">
          <header className="App-header">
            <h1>E-Commerce by Ankit Dave</h1>
          </header>
          <Routes>
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
