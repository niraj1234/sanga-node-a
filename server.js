require('dotenv').config();
const connectToDB = require('./database/db');
const express = require('express');
const bookRoutes = require('./routes/book-routes.js');
const app = express();
const PORT = process.env.PORT || 3000 ;

// middleware
app.use(express.json());

// connect to mongo db
connectToDB();

// routes
app.use("/api/books" , bookRoutes);

app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
})



