const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title : {
        type: String,
        required : [true , 'Book title is required'],
        trim : true,
        maxLength : [100 , 'Book title can not be more than 100 character']
    } ,
    author : {
        type: String,
        required : [true , 'Book title is required'],
        trim : true,
    } ,
    year : {
        type: Number,
        required : [true , 'Publication year is required'],
        max : [new Date().getFullYear() , 'Year cannot be in the future'],
        min : [1000 , 'Year must be atleast 1000']
    } ,
    createdAt : {
        type: Date,
        default : Date.now,
    } 
});

module.exports = mongoose.model("Book" , BookSchema)

