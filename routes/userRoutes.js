const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const BlacklistedToken = require('../models/BlacklistedToken')
const authMiddleware = require('../middleware/auth')

router.post('/register' , async(req, res) => {
    try {
        const existing = await User.findOne({email : req.body.email});
        if(existing){
            return res.status(400).json({error: "user already exist"});
        }
        const hashPass = await bcrypt.hash(req.body.password , 10);

        const newUser = new User({
            username: req.body.username,
            email : req.body.email,
            password : hashPass,
            city : req.body.city,
            age : req.body.age,
            gender: req.body.gender
        })

        await newUser.save();
        res.status(201).json({message: " user created successfully"})
    } catch (error) {
        res.status(500).json({message: " internqal server error"})
    }
});

router.post('/login' , async(req, res) => {
    try {
        const user = await User.findOne({email : req.body.email});
        if(!user){
            return res.status(401).json({error: "invalid credentials"});
        }
        const passMatch = await bcrypt.compare(req.body.password , user.password);
        if(!passMatch){
            return res.status(401).json({error: "invalid credentials"});
        }

        const token = jwt.sign({userId: user._id}, process.env.SECRETKEY, {expiresIn: '7d'});
        res.status(201).json({message: " user login successfully", token})
    } catch (error) {
        res.status(500).json({message: " internqal server error"})
    }
});

router.post('/logout' ,authMiddleware,  async(req, res) => {
    try {
        const token = req.header('Authorization');
        if(!token){
            return res.status(401).json({error: " no token found"})
        }
        const blacklistToken = new BlacklistedToken({token});
        await blacklistToken.save();
        res.status(201).json({message: " user logout successfully", token})
    } catch (error) {
        res.status(500).json({message: " internqal server error"})
    }
});


module.exports = router;