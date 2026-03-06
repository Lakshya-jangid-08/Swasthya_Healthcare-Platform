const mongoose = require('mongoose');
const { DATABASE_URL } = require('./env');

const dbURL = DATABASE_URL;
console.log('Database URL:', dbURL); // Debugging line

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL).
        then(() => {
            console.log('MongoDB connected successfully');
        });
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }   
};

module.exports = connectDB;