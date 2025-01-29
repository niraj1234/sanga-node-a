const express = require('express');
const { getAllBooks , getBookById , addNewBook , updateBook , deleteBook } = require('../controllers/book-controller.js');
//  create express router
const router = express.Router();

// routes related to book
router.get("/get" , getAllBooks );
router.get("/get/:id" , getBookById );
router.post("/add" , addNewBook );
router.put("/update/:id" , updateBook );
router.delete("/delete/:id" , deleteBook );

module.exports = router;


