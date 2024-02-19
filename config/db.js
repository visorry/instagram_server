const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURL)
    console.log('DB connected successfully');
  } catch (error) {
    console.error('connection failed:', error);
  }
};

module.exports = connectDB;