const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  variant: { type: String, required: true },
  engineCC: { type: Number, required: true },
  mileage: { type: Number, required: true },
  transmission: { type: String, enum: ['Automatic', 'Manual'], required: true },
  fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric'], required: true },
  color: { type: String, required: true },
  condition: { type: String, enum: ['New', 'Used'], required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  registeredIn: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], // Array of Cloudinary URLs
  seller: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Car', carSchema);
