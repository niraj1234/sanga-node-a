const Image = require('../models/Image');
const {uploadToCloudinary} = require('../helpers/cloudinaryHelper');
const fs = require('fs');

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


module.exports =  {uploadImageController , fetchAllImages } ;
