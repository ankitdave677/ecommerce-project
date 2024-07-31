import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import NavBar from './components/NavBar';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
    return (
        <CartProvider>
            <Router>
                <header className="App-header">
                    <h1>E-Commerce by Ankit Dave</h1>
                    <NavBar />
                </header>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/categories/:categoryId" element={<CategoryPage />} />
                    <Route path="/product/:productId" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </Router>
        </CartProvider>
    );
}

export default App;
