import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../services/api';

const Listings = () => {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({ make: '', city: '' });
  const location = useLocation();

  useEffect(() => {
    // Sync filters with URL params on load
    const params = new URLSearchParams(location.search);
    setFilters({
      make: params.get('make') || '',
      city: params.get('city') || ''
    });
  }, [location.search]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const query = new URLSearchParams(filters).toString();
        const res = await api.get(`/cars?${query}`);
        setCars(res.data);
      } catch (err) {
        console.error('Error fetching cars:', err);
      }
    };
    fetchCars();
  }, [filters]);

  return (
    <div className="container py-5">
      <h2 className="section-title">All Vehicle Listings</h2>
      
      <div className="search-bar" style={{ marginBottom: '3rem' }}>
        <select 
          name="make" 
          value={filters.make}
          onChange={(e) => setFilters({ ...filters, make: e.target.value })}
        >
          <option value="">Any Make</option>
          <option value="Toyota">Toyota</option>
          <option value="Honda">Honda</option>
          <option value="BMW">BMW</option>
        </select>
        <select 
          name="city"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        >
          <option value="">Any City</option>
          <option value="London">London</option>
          <option value="Manchester">Manchester</option>
          <option value="Birmingham">Birmingham</option>
        </select>
        <button className="btn" onClick={() => setFilters({ make: '', city: '' })}>Clear</button>
      </div>

      {cars.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#777' }}>No cars found matching your criteria.</p>
      ) : (
        <div className="grid-container grid-3">
          {cars.map((car) => (
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
      )}
    </div>
  );
};

export default Listings;
