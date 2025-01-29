const Book = require('../models/book');

const getAllBooks = async (req,res) => {
    try {
        const allBooks = await Book.find({});
        if(allBooks?.length > 0){
            return res.status(200).json({
                success :true,
                message: `${allBooks.length} Books fetched from DB`,
                data : allBooks
            })
        } else{
            return res.status(404).json({
                success : false,
                message : "No books found"
            })
        }
    } catch (error) {
        console.log("Error in book controller " + error);
    }
}


const getBookById = async (req,res) => {
    try {
        const getCurrentBookId = req.params.id;
        const bookDetailsById = await Book.findById(getCurrentBookId);
        if(!bookDetailsById){
            return res.status(404).json({
                success : false ,
                message : 'Book with given id not found'
            })
        }else{
            return res.status(200).json({
                success : true ,
                data : bookDetailsById
            })
        }
    } catch (error) {
        console.log("Error in book controller " + error);
    }
}


const addNewBook = async ( req , res ) => {
    try {
        const newBookFormData = req.body ;
        console.log(newBookFormData);
        const newlyCreatedBook = await Book.create(newBookFormData);
        if(newlyCreatedBook){
           return res.status(201).json({
                success: true,
                message : 'Book added to db',
                data : newlyCreatedBook
            });
        }
    } catch (error) {
        console.log("Error in book controller " + error);
    }
}


const updateBook = async (req,res) => {
    try {
        
    } catch (error) {
        console.log("Error in book controller " + error);
    }
}


const deleteBook = async (req,res) => {
    try {
        
    } catch (error) {
        console.log("Error in book controller " + error);
    }
}


module.exports = { getAllBooks , getBookById , addNewBook , updateBook , deleteBook };

