require('dotenv').config();
const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected successfully !!');
    } catch (e) {
        console.error('Mongo DB connection failed' , e)
        process.exit(1);        
    }
};

module.exports = connectToDB
