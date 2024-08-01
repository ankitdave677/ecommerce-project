import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../assets/logo.png';

function NavBar() {
    return (
        <nav className="navbar">
             <Link to="/" className="navbar-logo">
                <img src={logo} alt="AD's WatchStore Logo" className="logo" />
            </Link>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Shop</Link></li>
                <li><Link to="/cart">Cart</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
