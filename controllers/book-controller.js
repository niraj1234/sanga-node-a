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
        const bookIdToUpdate = req.params.id;
        const updateBookData = req.body;
        const updatedBook = await Book.findByIdAndUpdate(bookIdToUpdate , updateBookData ,{ new : true });

        if(!updatedBook){
            res.status(404).json({
                success : false ,
                message : 'Book not found with given id'
            })
        }else{
            res.status(200).json({
                success : true ,
                message : 'Book updated successfully',
                data : updatedBook
            })
        }

    } catch (error) {
        console.log("Error in book controller " + error);
        res.status(500).json({
            success : false ,
            message : 'Something went wrong'
        })
    }
}


const deleteBook = async (req,res) => {
    try {
        const bookIdRequested = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(bookIdRequested);
        if(!deletedBook){
            res.status(404).json({
                success : false ,
                message : 'Book not found with given id'
            })
        }else{
            res.status(200).json({
                success : true ,
                message : 'Book deleted successfully',
                data : deletedBook
            })
        }
        
    } catch (error) {
        console.log("Error in book controller " + error);
        res.status(500).json({
            success : false ,
            message : 'Something went wrong'
        })

    }
}


module.exports = { getAllBooks , getBookById , addNewBook , updateBook , deleteBook };

