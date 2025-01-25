const express = require('express');
const app = express();

// Middleware
app.use(express.json());

app.listen(3000 , ()=> {
    console.log('Server started at 3000');
})


let books = [
    {
        id : 1,
        title : "Book 1"
    },
    {
        id : 2,
        title : "Book 2"
    },
    {
        id : 3,
        title : "Book 3"
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

app.get('/book/:id' , (req,res) => {
    const book = books.find(item => item.id === parseInt(req.params.id));
    if(book){
        res.status(200).json(book);
    } else{
        res.status(404).json({
            message: "No book found for given id"
        })
    }
})

app.post('/add' , (req,res) => {
    const newBook = {
        id : books.length + 1,
        title : `Book ${books.length + 1}`
    }
    books.push(newBook);
    res.status(200).json({
        message: "New book added",
        data : newBook,
        allBook : books
    })
})


app.put('/update/:id' , (req,res) => {
    console.log("Incoming title ==> " + req.body.title);
    const findCurrentBook = books.find( bookitem => bookitem.id === parseInt(req.params.id));
    if(findCurrentBook){
        findCurrentBook.title = req.body.title  || findCurrentBook.title;
        res.status(200).json({
            message : `Book with ID ${req.params.id} updated successfully`,
            data : findCurrentBook,
            allBook : books
        })
    } else{
        res.status(404).json({
            message : "Book is not updated with given ID"
        })
    }
})


app.delete('/delete/:id' , (req,res) => {
    const findIndexOfCurrentBook = books.findIndex(
        (item) => item.id === parseInt(req.params.id)
      );
      console.log(findIndexOfCurrentBook)
      if (findIndexOfCurrentBook !== -1) {
        const deletedBook = books.splice(findIndexOfCurrentBook, 1);
        res.status(200).json({
          message: "Book deleted successfully",
          data: deletedBook[0],
          allBook : books
        });
      } else {
        res.status(404).json({
          message: "Book not found",
        });
      }
});