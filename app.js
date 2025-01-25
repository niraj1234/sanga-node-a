const express = require('express');
const app = express();

// Middleware
app.use(express.json());

let books = [
    {
        id : "1",
        title : "Book 1"
    },
    {
        id : "1",
        title : "Book 1"
    },
    {
        id : "1",
        title : "Book 1"
    }    
] ;

// route => get all books
app.get('/' , (req,res) => {
    res.json({
        message: "Welcome to Book-Store API"
    })
})

app.get('/books' , (req,res) =>{
    res.json(books);
})

app.listen(3000 , ()=> {
    console.log('Server started at 3000');
})