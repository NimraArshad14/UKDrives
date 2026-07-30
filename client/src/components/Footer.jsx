import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <Link to="/" className="logo">UK<span>Drives</span></Link>
            <p style={{ fontStyle: 'italic', color: '#ccc', marginTop: '1rem' }}>Turn your current car into your next dream ride.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <div className="footer-links">
              <Link to="/about">About Us</Link>
              <Link to="/blog">Blog</Link>
            </div>
          </div>
          <div className="footer-section">
            <h3>Contact Info</h3>
            <p style={{ color: '#ccc', marginBottom: '0.5rem' }}>Email: support@ukdrives.com</p>
            <p style={{ color: '#ccc' }}>Phone: 0800 123 4567</p>
          </div>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} UKDrives. Crafted for the UK market.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
