const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://nirajdesktop:nsangamnode1@cluster0.3nwb4.mongodb.net/");
        console.log('MongoDB connected successfully !!');
    } catch (e) {
        console.error('Mongo DB connection failed' , e)
        process.exit(1);        
    }
};

module.exports = connectToDB
