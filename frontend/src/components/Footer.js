import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Student Details</h3>
                    <p>Student Name: Ankit Dave</p>
                    <p>Student Number: 8959634</p>
                </div>
                <div className="footer-section">
                    <h3>Contact Me</h3>
                    <p>Email: adave9634@conestogac.on.ca</p>
                    <p>Phone: +1 226 978 0724</p>
                </div>
                <div className="footer-section">
                    <h3>My Social Links</h3>
                    <ul className="social-links">
                        <li><a href="https://github.com/ankitdave677">GitHub</a></li>
                        <li><a href="https://www.linkedin.com/in/ankit-dave-70861018a/">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 AD's WatchStore by Ankit Dave.</p>
            </div>
        </footer>
    );
}

export default Footer;
