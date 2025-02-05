const cloudinaryHelper = require('../config/cloudinary');

const uploadToCloudinary = async (filePath)=>{
try {
    const result = await cloudinaryHelper.uploader.upload(filePath);
    return {
        url : result.secure_url,
        publicId : result.public_id
    }
} catch (error) {
    console.log('Error while uploading to Cloudinary' + error);
   throw new Error('Error while uploading to cloudinary');    
}
}

module.exports = { uploadToCloudinary } ;
