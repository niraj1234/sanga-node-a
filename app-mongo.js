const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://nirajdesktop:nsangamnode1@cluster0.3nwb4.mongodb.net/").then(
    () => console.log('MongoDB connected successfully !!')
).catch( (err) => console.log("Error while connection to mongodb cluster" + err ));

const userSchema = new mongoose.Schema(
    {
        name : String,
        email : String,
        age : Number,
        isActive : Boolean ,
        tags : [String],
        createdAt : { type : Date, default : Date.now }
    }
)

// creating user model
const User = mongoose.model('User' , userSchema );

async function runQueryExample(){
    try {
        // const newUser = await User.create({
        //     name : 'Pat Cummins',
        //     email : 'pat.cummins@australiya.com',
        //     age : 44,
        //     isActive : true ,
        //     tags : ['cricketer']                
        // })
        // console.log('Created new user' , newUser);

        // const allUsers = await User.find({});
        // console.log(allUsers);

        // const getUsersActiveFalse = await User.find({ isActive : false });
        // console.log(getUsersActiveFalse);

        // const userMitchStarc = await User.findOne({name : 'Mitchel Starc'});
        // console.log(userMitchStarc);

        // const userById = await User.findById(newUser._id);
        // console.log(userById);

        // const dataWithSelectedFields = await User.find().select('name -_id  age isActive email' );
        // console.log(dataWithSelectedFields);

        // const limitedUser = await User.find().limit(3).skip(2);
        // console.log(limitedUser);

        // const sortedUser = await User.find().sort({ age: -1});
        // console.log(sortedUser);

        const countDocuments = await User.countDocuments({isActive : true});
        console.log(countDocuments);

    } catch (error) {
        console.log(error)
    }finally{
        await mongoose.connection.close()
    }
}

runQueryExample();

