const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const uploadMiddleware = require('../middleware/upload-middleware');
const {uploadImageController , fetchAllImages , deleteImageController } = require('../controllers/image-controller');



// upload imahe
router.post( "/upload" , 
    authMiddleware , 
    adminMiddleware , 
    uploadMiddleware.single("image") , 
    uploadImageController
    );


// get all images
router.get("/all" , authMiddleware , fetchAllImages )

router.delete("/:id" , authMiddleware , adminMiddleware , deleteImageController )

module.exports = router ;
