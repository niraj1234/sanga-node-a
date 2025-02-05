const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const uploadMiddleware = require('../middleware/upload-middleware');
const {uploadImageController} = require('../controllers/image-controller');



// upload imahe
router.post( "/upload" , 
    authMiddleware , 
    adminMiddleware , 
    uploadMiddleware.single("image") , 
    uploadImageController
    );


// get all images


module.exports = router ;
