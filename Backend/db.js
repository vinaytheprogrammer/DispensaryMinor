// backend/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose
    .connect("mongodb://localhost:27017",{dbName: "DispensaryAnkit"})
    .then((c) => console.log(`Local Database Connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
