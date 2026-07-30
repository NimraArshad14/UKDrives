import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const Detail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await api.get(`/cars/${id}`);
        setCar(res.data);
      } catch (err) {
        console.error('Error fetching car details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleInquiry = () => {
    const user = localStorage.getItem('uk_user');
    if (!user) {
      alert('Please login to send an inquiry.');
      window.location.href = '/login';
    } else {
      alert(`Success! Your inquiry for the ${car.make} ${car.model} has been sent. The seller will contact you shortly.`);
    }
  };

  if (loading) return <div className="container py-5" style={{ textAlign: 'center', fontSize: '1.2rem' }}>Loading car details...</div>;
  if (!car) return (
    <div className="container py-5" style={{ textAlign: 'center' }}>
      <h2>Car not found</h2>
      <Link to="/listings" className="btn" style={{ marginTop: '1rem' }}>Back to Listings</Link>
    </div>
  );

  const mainImage = (car.images && car.images.length > 0) ? car.images[0] : 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&q=80';
  const sellerName = car.seller?.name || 'N/A';
  const sellerPhone = car.seller?.phone || 'N/A';

  const whatsappLink = `https://wa.me/${sellerPhone?.replace(/\D/g, '')}?text=Hi, I'm interested in your ${car.make} ${car.model} listed on UKDrives.`;

  return (
    <div className="container py-5">
      <Link to="/listings" style={{ display: 'inline-block', marginBottom: '1.5rem', color: 'var(--accent-color)', fontWeight: 600 }}>
        ← Back to Listings
      </Link>
      <div className="detail-grid">
        <div>
          <img
            src={mainImage}
            alt={`${car.make} ${car.model}`}
            className="detail-main-img"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&q=80'; }}
          />
          <div className="detail-description">
            <h2>Description</h2>
            <p>{car.description}</p>
          </div>
        </div>

        <div>
          <div className="detail-info-card">
            <h1 className="detail-car-title">{car.make} {car.model}</h1>
            <p className="detail-car-sub">{car.year} • {car.variant}</p>
            <div className="detail-price">£{car.price?.toLocaleString()}</div>

            <hr className="detail-divider" />

            <div className="detail-specs">
              <div><strong>Mileage</strong><span>{car.mileage?.toLocaleString()} mi</span></div>
              <div><strong>City</strong><span>{car.city}</span></div>
              <div><strong>Fuel</strong><span>{car.fuelType}</span></div>
              <div><strong>Transmission</strong><span>{car.transmission}</span></div>
              <div><strong>Engine</strong><span>{car.engineCC} cc</span></div>
              <div><strong>Colour</strong><span>{car.color}</span></div>
              <div><strong>Condition</strong><span>{car.condition}</span></div>
              <div><strong>Registered</strong><span>{car.registeredIn}</span></div>
            </div>

            <hr className="detail-divider" />

            <h3 style={{ marginBottom: '0.75rem' }}>Seller Information</h3>
            <p><strong>Name:</strong> {sellerName}</p>
            <p><strong>Phone:</strong> {sellerPhone}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn whatsapp-btn">
                💬 WhatsApp Seller
              </a>
              <button className="btn btn-secondary" style={{ width: '100%', padding: '1.2rem' }} onClick={handleInquiry}>
                📧 Send Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
