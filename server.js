require('dotenv').config();
const connectToDB = require('./database/db');
const express = require('express');
const bookRoutes = require('./routes/book-routes.js');
const authRoutes = require('./routes/auth-routes.js');
const homeRoutes = require('./routes/home-routes.js');
const adminRoutes = require('./routes/admin-routes.js');
const uploadImageRoutes = require('./routes/image-routes');


const app = express();
const PORT = process.env.PORT || 3000 ;

// middleware
app.use(express.json());

// connect to mongo db
connectToDB();

// routes
app.use('/api/books' , bookRoutes);
app.use('/api/auth' , authRoutes);
app.use('/api/home' , homeRoutes);
app.use('/api/admin' , adminRoutes);
app.use('/api/image' , uploadImageRoutes);


app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
})



