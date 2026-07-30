import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem('uk_user');
    if (stored) setUser(JSON.parse(stored));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('uk_token');
    localStorage.removeItem('uk_user');
    setUser(null);
    navigate('/');
  };

  return (
    <header>
      <div className="container nav-flex">
        <Link to="/" className="logo">UK<span>Drives</span></Link>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/listings">All Listings</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/sell" className="btn btn-secondary">Post a Car</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            {user ? (
              <>
                <li style={{ color: '#ccc', fontWeight: 500 }}>Hi, {user.fullName?.split(' ')[0]}</li>
                <li>
                  <button onClick={handleLogout} className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li><Link to="/login" className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
