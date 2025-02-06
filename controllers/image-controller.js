const Image = require('../models/Image');
const {uploadToCloudinary} = require('../helpers/cloudinaryHelper');
const fs = require('fs');
const cloudinary = require('cloudinary');

const uploadImageController = async (req,res) => {
 try {
    if(!req.file){
       return  res.status(400).json({
            success : false ,
            message : 'File is required olease upload image'
        })
    }

    const { url,publicId } = await uploadToCloudinary( req.file.path );

    const newlyUploadedImage = new Image({
        url,
        publicId,
        uploadedBy : req.userInfo.userId
    });

    await newlyUploadedImage.save();
    // deleting file from local storage folder
    fs.unlinkSync(req.file.path);

    res.status(201).json({
        success :true ,
        message : 'Image uploaded successfully',
        image : newlyUploadedImage
    })


 } catch (error) {
    console.log(error);
    res.status(500).json({
        success : false ,
        message : 'Something went wrong on server side Image Controller'
    })
 }
}

const fetchAllImages = async (req,res) => {
    try {
        const images = await Image.find({});
        if(!images){
            res.status(400).json({
                success : false,
                message : "Image not found" 
            })
        } else{
            res.status(200).json({
                success : true,
                message : `Total images found ${images.length} ` ,
                data : images
            })
        }        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false ,
            message : 'Something went wrong on server side Image Controller'
        })            
    }
}


// Delete image from MongoDB and Cloudinary
const deleteImageController = async (req, res) => {
    try {
      const getCurrentIdOfImageToBeDeleted = req.params.id;
      const userId = req.userInfo.userId;
      console.log(getCurrentIdOfImageToBeDeleted);
  
      const image = await Image.findById(getCurrentIdOfImageToBeDeleted);
  
      if (!image) {
        return res.status(404).json({
          success: false,
          message: "Image not found",
        });
      }
  
      //check if this image is uploaded by the current user who is trying to delete this image
      if (image.uploadedBy.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: `You are not authorized to delete this image because you haven't uploaded it`,
        });
      }
  
      //delete this image first from your cloudinary stroage
      await cloudinary.uploader.destroy(image.publicId);
  
      //delete this image from mongodb database
      await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted);
  
      res.status(200).json({
        success: true,
        message: "Image deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong! Please try again",
      });
    }
  };
  

module.exports =  {uploadImageController , fetchAllImages , deleteImageController } ;
