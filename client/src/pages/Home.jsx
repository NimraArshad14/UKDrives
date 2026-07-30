import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [search, setSearch] = useState({ make: '', city: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await api.get('/cars');
        setFeaturedCars(res.data.slice(0, 6)); // Show first 6 as featured
      } catch (err) {
        console.error('Error fetching featured cars:', err);
      }
    };
    fetchCars();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search.make) params.append('make', search.make);
    if (search.city) params.append('city', search.city);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div>
      <section className="hero">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1>Find Your Perfect Drive</h1>
          <p>the UK's most reliable platform for premium used and new vehicles.</p>
          <div className="search-bar">
            <select name="make" value={search.make} onChange={(e) => setSearch({...search, make: e.target.value})}>
              <option value="">Any Make</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="BMW">BMW</option>
            </select>
            <select name="city" value={search.city} onChange={(e) => setSearch({...search, city: e.target.value})}>
              <option value="">Any City</option>
              <option value="London">London</option>
              <option value="Manchester">Manchester</option>
              <option value="Birmingham">Birmingham</option>
            </select>
            <button className="btn" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="section-title">Featured Listings</h2>
          <div className="grid-container grid-3">
            {featuredCars.map((car) => (
              <div className="card" key={car._id}>
                <img 
                  src={car.images[0] || 'https://images.unsplash.com/photo-1542282088-fe8426682b8f'} 
                  alt={car.model} 
                  className="card-img" 
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&q=80'; }}
                />
                <div className="card-body">
                  <h3 className="card-title">{car.make} {car.model} {car.year}</h3>
                  <div className="card-price">£{car.price.toLocaleString()}</div>
                  <div className="card-meta">
                    <span>{car.mileage.toLocaleString()} km</span>
                    <span>{car.city}</span>
                  </div>
                  <Link to={`/detail/${car._id}`} className="btn btn-secondary" style={{ width: '100%', display: 'block' }}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/listings" className="btn">View All Listings</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
