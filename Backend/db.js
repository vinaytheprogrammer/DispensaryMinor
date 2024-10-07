// backend/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = () => {
  if(process.env.ENV==="DEV"){
    mongoose
    .connect("mongodb://localhost:27017",{dbName: "DispensaryAnkit"})
    .then((c) => console.log(`Local Database Connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
  }
  else{
    mongoose
    .connect(process.env.MONGO_URI)
    .then((c) => console.log(`Global Database Connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
  }
};

module.exports = connectDB;
