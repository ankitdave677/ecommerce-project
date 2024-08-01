import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
    return (
        <CartProvider>
            <Router>
                <header className="App-header">
                    <NavBar />
                </header>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/categories/:id" element={<CategoryPage />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
                <Footer />
            </Router>
        </CartProvider>
    );
}

export default App;
