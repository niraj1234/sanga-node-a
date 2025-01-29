require('dotenv').config();
const connectToDB = require('./database/db');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000 ;

// connect to mongo db
connectToDB();

// middleware
app.use(express.json());
app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
})



