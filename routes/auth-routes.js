const express = require('express');
const {registerUser , loginUser} = require('../controllers/auth-controller');
const router = express.Router();

// authentication and authorization routes 
router.post('/register' , registerUser);
router.post('/login' , loginUser);

module.exports = router;

