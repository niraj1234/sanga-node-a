const Image = require('../models/Image');
const {uploadToCloudinary} = require('../helpers/cloudinaryHelper');

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

module.exports =  {uploadImageController} ;
