import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Sell = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: 2024,
    variant: '',
    engineCC: 1500,
    mileage: 0,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    color: '',
    condition: 'Used',
    price: '',
    city: '',
    registeredIn: 'England',
    description: '',
    images: [],
    seller: {
        name: '',
        phone: '',
        email: ''
    }
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Pre-fill user data if available
    const user = JSON.parse(localStorage.getItem('uk_user'));
    if (user) {
        setFormData(prev => ({
            ...prev,
            seller: {
                name: user.fullName || '',
                email: user.email || '',
                phone: user.phone || ''
            }
        }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure images has at least one entry or use a placeholder
      const submissionData = { ...formData };
      if (!submissionData.images || submissionData.images.length === 0 || !submissionData.images[0]) {
        submissionData.images = ['https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&q=80'];
      }

      await api.post('/cars', submissionData);
      setSuccess(true);
      window.scrollTo(0, 0);
      setTimeout(() => navigate('/listings'), 2000);
    } catch (err) {
      alert('Failed to post ad. Please ensure all fields are filled correctly.');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('seller.')) {
        const sellerField = name.split('.')[1];
        setFormData({
            ...formData,
            seller: { ...formData.seller, [sellerField]: value }
        });
    } else {
        setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '800px' }}>
      <h2 className="section-title">Post Your Ad for Free</h2>
      
      {success && <div className="alert success" style={{ display: 'block', marginBottom: '2rem' }}>Your car has been listed successfully! Redirecting...</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>1. Vehicle Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label>Make</label>
              <select className="form-control" name="make" required value={formData.make} onChange={handleChange}>
                <option value="">Select Make</option>
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes">Mercedes</option>
                <option value="Ford">Ford</option>
                <option value="Audi">Audi</option>
                <option value="Nissan">Nissan</option>
                <option value="Kia">Kia</option>
              </select>
            </div>
            <div className="form-group">
              <label>Model</label>
              <input type="text" name="model" className="form-control" required placeholder="e.g. Corolla" value={formData.model} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Year</label>
              <input type="number" name="year" className="form-control" required value={formData.year} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Variant</label>
              <input type="text" name="variant" className="form-control" required placeholder="e.g. GLi / S-Line" value={formData.variant} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Engine (CC)</label>
              <input type="number" name="engineCC" className="form-control" required placeholder="e.g. 1500" value={formData.engineCC} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Mileage (miles)</label>
              <input type="number" name="mileage" className="form-control" required placeholder="e.g. 25000" value={formData.mileage} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Transmission</label>
              <select className="form-control" name="transmission" required value={formData.transmission} onChange={handleChange}>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            <div className="form-group">
              <label>Fuel Type</label>
              <select className="form-control" name="fuelType" required value={formData.fuelType} onChange={handleChange}>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            <div className="form-group">
                <label>Color</label>
                <input type="text" name="color" className="form-control" required placeholder="e.g. Metallic Grey" value={formData.color} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Condition</label>
              <select className="form-control" name="condition" required value={formData.condition} onChange={handleChange}>
                <option value="Used">Used</option>
                <option value="New">New</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>2. Price & Location</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label>Price (£)</label>
              <input type="number" name="price" className="form-control" required placeholder="e.g. 15000" value={formData.price} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>City</label>
              <select className="form-control" name="city" required value={formData.city} onChange={handleChange}>
                <option value="">Select City</option>
                <option value="London">London</option>
                <option value="Manchester">Manchester</option>
                <option value="Birmingham">Birmingham</option>
                <option value="Leeds">Leeds</option>
                <option value="Glasgow">Glasgow</option>
              </select>
            </div>
            <div className="form-group" style={{ gridColumn: '1/-1' }}>
                <label>Registered In</label>
                <select className="form-control" name="registeredIn" required value={formData.registeredIn} onChange={handleChange}>
                    <option value="England">England</option>
                    <option value="Scotland">Scotland</option>
                    <option value="Wales">Wales</option>
                    <option value="Northern Ireland">Northern Ireland</option>
                    <option value="Unregistered">Unregistered</option>
                </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>3. Description & Images</h3>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" className="form-control" rows="5" required placeholder="Describe your car's features, history, and overall condition..." value={formData.description} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type="url" name="image0" className="form-control" placeholder="https://unsplash.com/photos/..." onChange={(e) => setFormData({ ...formData, images: [e.target.value] })} />
            <small style={{ color: 'var(--text-light)', marginTop: '0.5rem', display: 'block' }}>Enter a direct link to an image (e.g. from Unsplash). Leave blank for a default car image.</small>
          </div>
        </div>

        <div className="form-section">
            <h3>4. Contact Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="seller.name" className="form-control" required value={formData.seller.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" name="seller.phone" className="form-control" required value={formData.seller.phone} onChange={handleChange} />
                </div>
                <div className="form-group" style={{ gridColumn: '1/-1' }}>
                    <label>Email</label>
                    <input type="email" name="seller.email" className="form-control" required value={formData.seller.email} onChange={handleChange} />
                </div>
            </div>
        </div>

        <button type="submit" className="btn btn-secondary" style={{ width: '100%', padding: '1.2rem', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1rem' }}>Post Ad Now</button>
      </form>
    </div>
  );
};

export default Sell;
