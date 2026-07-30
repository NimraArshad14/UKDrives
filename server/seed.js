const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const Car = require('./models/Car');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const carData = [
  { make: 'Toyota', model: 'Corolla', year: 2021, variant: 'Altis 1.8', engineCC: 1800, mileage: 35000, transmission: 'Automatic', fuelType: 'Petrol', color: 'White', condition: 'Used', price: 15000, city: 'London', registeredIn: 'England', description: 'Exceptional condition Toyota Corolla with low mileage. Full dealer history.', sourceImg: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f', seller: { name: 'Oliver W', phone: '07412345678', email: 'ow@email.com' } },
  { make: 'Honda', model: 'Civic', year: 2022, variant: 'Turbo Sport', engineCC: 1500, mileage: 20000, transmission: 'Automatic', fuelType: 'Petrol', color: 'Black', condition: 'Used', price: 21000, city: 'London', registeredIn: 'England', description: 'Fully loaded Civic. Showroom condition, sunroof and Honda Sensing.', sourceImg: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7', seller: { name: 'Emily J', phone: '07523456789', email: 'ej@email.com' } },
  { make: 'BMW', model: '3 Series', year: 2018, variant: '320d M Sport', engineCC: 2000, mileage: 50000, transmission: 'Automatic', fuelType: 'Diesel', color: 'Grey', condition: 'Used', price: 18000, city: 'Manchester', registeredIn: 'England', description: 'M Sport kit, heated seats, professional nav. Premium executive saloon.', sourceImg: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c', seller: { name: 'Will B', phone: '07745678901', email: 'will@email.com' } },
  { make: 'Mercedes', model: 'C Class', year: 2019, variant: 'C200 AMG Line', engineCC: 2000, mileage: 40000, transmission: 'Automatic', fuelType: 'Petrol', color: 'Black', condition: 'Used', price: 22000, city: 'Birmingham', registeredIn: 'England', description: 'AMG Line specs with premium plus pack. Burmester sound system.', sourceImg: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888', seller: { name: 'Sophie D', phone: '07856789012', email: 'sophie@email.com' } },
  { make: 'Kia', model: 'Sportage', year: 2021, variant: 'GT-Line S', engineCC: 1600, mileage: 25000, transmission: 'Automatic', fuelType: 'Hybrid', color: 'White', condition: 'Used', price: 24000, city: 'Leeds', registeredIn: 'England', description: 'Remaining Kia 7-year warranty. Hybrid economy with GT-Line styling.', sourceImg: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d', seller: { name: 'Dan W', phone: '07967890123', email: 'dan@email.com' } },
  { make: 'Ford', model: 'Mustang', year: 2023, variant: 'GT 5.0 V8', engineCC: 5000, mileage: 5000, transmission: 'Automatic', fuelType: 'Petrol', color: 'Red', condition: 'Used', price: 45000, city: 'London', registeredIn: 'England', description: 'Beastly 5.0 V8 Muscle. Almost new condition.', sourceImg: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b', seller: { name: 'Chris P', phone: '07123456711', email: 'chris@email.com' } },
  { make: 'Audi', model: 'A3', year: 2020, variant: 'S Line', engineCC: 1500, mileage: 30000, transmission: 'Automatic', fuelType: 'Petrol', color: 'Blue', condition: 'Used', price: 18500, city: 'Manchester', registeredIn: 'England', description: 'Virtual cockpit, Matrix LED headlights, S Line half leather interior.', sourceImg: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29', seller: { name: 'Amy R', phone: '07234567822', email: 'amy@email.com' } },
  { make: 'Volkswagen', model: 'Golf', year: 2019, variant: 'GTI Performance', engineCC: 2000, mileage: 38000, transmission: 'Automatic', fuelType: 'Petrol', color: 'Red', condition: 'Used', price: 19500, city: 'London', registeredIn: 'England', description: 'Iconic hot hatch. Tartan seats, active info display, great fun.', sourceImg: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d', seller: { name: 'Tom F', phone: '07345678933', email: 'tom@email.com' } },
  { make: 'Tesla', model: 'Model 3', year: 2022, variant: 'Long Range', engineCC: 0, mileage: 15000, transmission: 'Automatic', fuelType: 'Electric', color: 'White', condition: 'Used', price: 35000, city: 'Bristol', registeredIn: 'England', description: 'Zero emissions, auto-pilot, premium white interior.', sourceImg: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89', seller: { name: 'Zoe M', phone: '07456789044', email: 'zoe@email.com' } },
  { make: 'Land Rover', model: 'Range Rover Evoque', year: 2020, variant: 'R-Dynamic SE', engineCC: 2000, mileage: 28000, transmission: 'Automatic', fuelType: 'Diesel', color: 'Silver', condition: 'Used', price: 32000, city: 'Birmingham', registeredIn: 'England', description: 'Luxury compact SUV. Panoramic roof, meridian audio.', sourceImg: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341', seller: { name: 'Harry N', phone: '07567890155', email: 'harry@email.com' } },
  { make: 'Porsche', model: '911', year: 2019, variant: 'Carrera S', engineCC: 3000, mileage: 12000, transmission: 'Automatic', fuelType: 'Petrol', color: 'Yellow', condition: 'Used', price: 85000, city: 'London', registeredIn: 'England', description: 'Exquisite condition. Sport chrono pack, sports exhaust.', sourceImg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70', seller: { name: 'Mark D', phone: '07678901266', email: 'mark@email.com' } },
  { make: 'Nissan', model: 'Qashqai', year: 2021, variant: 'Tekna+', engineCC: 1300, mileage: 18000, transmission: 'Manual', fuelType: 'Petrol', color: 'Blue', condition: 'Used', price: 21000, city: 'Newcastle', registeredIn: 'England', description: 'Ideal family crossover. Nappa leather, Bose audio.', sourceImg: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5', seller: { name: 'Sara P', phone: '07789012377', email: 'sara@email.com' } },
  { make: 'Mazda', model: 'MX-5', year: 2018, variant: 'RF Sport Nav', engineCC: 2000, mileage: 22000, transmission: 'Manual', fuelType: 'Petrol', color: 'Soul Red', condition: 'Used', price: 17000, city: 'Sheffield', registeredIn: 'England', description: 'Fantastic summer roadster. Retractable fastback.', sourceImg: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7', seller: { name: 'Neil K', phone: '07890123488', email: 'neil@email.com' } },
  { make: 'Toyota', model: 'Yaris', year: 2023, variant: 'Design', engineCC: 1500, mileage: 5000, transmission: 'Automatic', fuelType: 'Hybrid', color: 'Grey', condition: 'Used', price: 20000, city: 'London', registeredIn: 'England', description: 'Super efficient city runner. Practically brand new.', sourceImg: 'https://images.unsplash.com/photo-1590362891991-f776e747a588', seller: { name: 'Fiona L', phone: '07901234599', email: 'fiona@email.com' } },
  { make: 'Jaguar', model: 'F-Type', year: 2020, variant: 'Chequered Flag Edition', engineCC: 2000, mileage: 14000, transmission: 'Automatic', fuelType: 'Petrol', color: 'White', condition: 'Used', price: 42000, city: 'Manchester', registeredIn: 'England', description: 'Stunning sports coupe. Fixed panoramic roof, performance seats.', sourceImg: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2', seller: { name: 'Colin V', phone: '07112233445', email: 'colin@email.com' } },
  { make: 'Hyundai', model: 'Tucson', year: 2022, variant: 'Ultimate', engineCC: 1600, mileage: 16000, transmission: 'Automatic', fuelType: 'Hybrid', color: 'Black', condition: 'Used', price: 28000, city: 'Birmingham', registeredIn: 'England', description: 'Great spec family SUV. Ventilated seats, smart tailgate.', sourceImg: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537', seller: { name: 'David C', phone: '07223344556', email: 'david@email.com' } },
  { make: 'Suzuki', model: 'Swift', year: 2021, variant: 'SZ-T', engineCC: 1200, mileage: 25000, transmission: 'Manual', fuelType: 'Hybrid', color: 'Red', condition: 'Used', price: 11000, city: 'Leeds', registeredIn: 'England', description: 'Nimble and reliable. Reverse camera, Apple CarPlay.', sourceImg: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068', seller: { name: 'Rachel T', phone: '07334455667', email: 'rachel@email.com' } },
  { make: 'BMW', model: '1 Series', year: 2021, variant: '118i M Sport', engineCC: 1500, mileage: 20000, transmission: 'Automatic', fuelType: 'Petrol', color: 'Blue', condition: 'Used', price: 22000, city: 'Nottingham', registeredIn: 'England', description: 'Premium hatchback. Magma red leather interior, pro pack.', sourceImg: 'https://images.unsplash.com/photo-1556800572-1b8aeef2c54f', seller: { name: 'Liam S', phone: '07445566778', email: 'liam@email.com' } },
  { make: 'Volvo', model: 'XC40', year: 2020, variant: 'R-Design Pro', engineCC: 2000, mileage: 32000, transmission: 'Automatic', fuelType: 'Petrol', color: 'White', condition: 'Used', price: 27000, city: 'Bristol', registeredIn: 'England', description: 'Safe, stylish and practical. Harman/Kardon sound, 20-inch alloys.', sourceImg: 'https://images.unsplash.com/photo-1610647752706-3bb12232b3ab', seller: { name: 'Claire G', phone: '07556677889', email: 'claire@email.com' } },
  { make: 'Lexus', model: 'RX', year: 2019, variant: '450h F Sport', engineCC: 3500, mileage: 45000, transmission: 'Automatic', fuelType: 'Hybrid', color: 'Grey', condition: 'Used', price: 34000, city: 'London', registeredIn: 'England', description: 'Incredibly reliable luxury SUV. Smooth hybrid V6 power.', sourceImg: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca', seller: { name: 'Ian H', phone: '07667788990', email: 'ian@email.com' } }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    try {
      await mongoose.connection.collection('cars').drop();
      console.log('Cleared existing cars and indexes');
    } catch (dropErr) {
      if (dropErr.code !== 26) {
        console.log('Error dropping collection:', dropErr.message);
      }
    }

    console.log('Uploading 20 images to Cloudinary (this may take a minute)...');
    const carsWithCloudinary = [];

    for (let i = 0; i < carData.length; i++) {
      const car = carData[i];
      try {
        const result = await cloudinary.uploader.upload(`${car.sourceImg}?auto=format&fit=crop&w=800&q=80`, {
          folder: 'ukdrives',
          transformation: [{ width: 800, height: 500, crop: 'fill', quality: 'auto' }]
        });
        console.log(`  [${i + 1}/20] ✓ Uploaded: ${car.make} ${car.model}`);

        const { sourceImg, ...carFields } = car;
        carsWithCloudinary.push({ ...carFields, images: [result.secure_url] });
      } catch (uploadErr) {
        console.log(`  [${i + 1}/20] ✗ Failed ${car.make} ${car.model}, using source URL`);
        const { sourceImg, ...carFields } = car;
        carsWithCloudinary.push({ ...carFields, images: [sourceImg] });
      }
    }

    await Car.insertMany(carsWithCloudinary);
    console.log(`\nSeeded ${carsWithCloudinary.length} cars successfully!`);
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err.message);
    process.exit(1);
  }
};

seedDB();
