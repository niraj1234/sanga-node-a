const User = require('../models/User');
const bcrypt = require('bcryptjs');

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
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'Something went wrong at server'
        })
    }
}


module.exports = {registerUser , loginUser}

