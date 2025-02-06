const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register controller
const registerUser = async (req,res) => {
    try {
        const { username , email , password , role } = req.body;
        const checkExistingUser = await User.findOne({ $or : [{username} , {email}]});
        if(checkExistingUser){
            return res.status(400).json({
                success :false,
                message : 'User exist with username or email, try different'
            });            
        }

        // hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);
        // create a new user
        const newlyCreatedUser = new User({
            username,
            email,
            password : hashedPassword,
            role : role || 'user'
        })

        await newlyCreatedUser.save();
        if(newlyCreatedUser){
            res.status(201).json({
                success : true,
                message : `User with email ${email} created successfully !!`
            })
        } else{
            res.status(400).json({
                success : false,
                message : `User registration failed ! Try again`
            })
        }


    } catch (e) {
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'Something went wrong at server'
        })
    }
}

// login controller
const loginUser = async (req,res) => {
    try {
        const { username , password } = req.body;
        
        // check user exist or not for given username
        const existingUser = await User.findOne({username});
        if(!existingUser){
            return res.status(400).json({
                success : false,
                message : 'User credential invalid'
            });
        }
        // check password correct or not
        const isPasswordMatch = await bcrypt.compare(password , existingUser.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success : false,
                message : 'User credential invalid'
            });
        }
        
        // create user token
        const accessToken = jwt.sign({
            userId : existingUser._id,
            username : existingUser.username,
            role : existingUser.role
        } , process.env.JWT_SECRET_KEY , {
            expiresIn : '60m'
        });

        res.status(200).json({
            success : true,
            message : 'Logged in successfully',
            accessToken
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'Something went wrong at server'
        })
    }
}


// change password, user must be logged is, 
// Forgot password is having different implementation
const changePassword = async (req,res) => {

    try {
        const userId = req.userInfo.userId;
        const { oldPassword , newPassword } = req.body;
        const userFromDB = await User.findById(userId);
        if(!userFromDB){
            return res.status(404).json({
                success : false,
                message : "No user found"
            });
        } 

        const isPasswordMatch = await bcrypt.compare(oldPassword , userFromDB.password);
        if(!isPasswordMatch){
            return res.status(404).json({
                success : false,
                message : "Password not matched with provided oldPassword"
            })
        }

        // hash the new password
        const salt = await bcrypt.genSalt(10);
        const newHashedPaaaword = await bcrypt.hash(newPassword,salt);
        userFromDB.password = newHashedPaaaword;

        userFromDB.save();

        res.status(200).json({
            success :true,
            message : "User password updated successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status : false,
            message : 'Something went wrong on server | auth-controller > change password[]'
        })
    }
}




module.exports = {registerUser , loginUser , changePassword }

