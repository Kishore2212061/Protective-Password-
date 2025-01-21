const express = require('express');
const User = require('../models/User');
const generateDynamicPassword = require('../utils/generatePassword');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password,fixedValue, trigFunction, keyValue1 } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already taken' });
        }
 
        const newUser = new User({ 
            username, 
            password,    
            fixedValue, 
            trigFunction, 
            keyValue1 
        });

        await newUser.save();

        // Return the new user data without the password
        res.status(201).json({ 
            message: 'User registered successfully!', 
            user: { 
                id: newUser._id, 
                username: newUser.username,
            } 
        });
    } catch (error) {
   
        res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
});


router.post('/login', async (req, res) => {
    const { username,password, dynamicPassword, keyValue,fixedValue,trigFunction} = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'User not found' });
const currentDate = new Date();
const options = { hour: 'numeric', hour12: false, timeZone: 'Asia/Kolkata' };
const currentHour= new Intl.DateTimeFormat('en-US', options).format(currentDate);


                
        const calculatedDynamicPassword = generateDynamicPassword(
            password,
            fixedValue,
            keyValue,
            currentHour,
            trigFunction
        );


        if (calculatedDynamicPassword === dynamicPassword) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(400).json({ error: 'Invalid dynamic password' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;