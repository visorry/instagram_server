const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/auth')

const Picture = require('../models/Picture');
const uploadMiddleware = require('../middleware/upload')

router.post('/picture' , authMiddleware, uploadMiddleware.single('photo'), async(req, res) => {
    try {
        const newPic = new Picture({
            quote: req.body.quote , 
            photo : req.file.path , 
            device : req.body.device , 
            commentsCount : req.body.commentsCount , 
            userID  : req.userId
        })
        await newPic.save();
        res.status(201).json({message: " picture created successfully"})
    } catch (error) {
        res.status(500).json({message: " internqal server error"})
    }
});

router.get('/picture', authMiddleware, async(req, res) => {
    try {
        const pic = await Picture.find({userID : req.userId});
        res.status(200).json({pic});

    } catch (error) {
        res.status(500).json({message: " internqal server error"})
    }
})

router.get('/picture/:id', authMiddleware, async(req, res) => {
    try {
        const pic = await Picture.findOne({_id : req.params.id});

        if(pic.userID.toString() !== req.userId){
            return res.status(401).json({message: " not authorised  error"})

        }
        res.status(201).json({pic});

    } catch (error) {
        res.status(500).json({message: " internqal server error"})
    }
})

router.put('/picture/:id', authMiddleware, async(req, res) => {
    try {
        const pic = await Picture.findOne({_id : req.params.id});

        if(pic.userID.toString() !== req.userId){
            return res.status(401).json({message: " not authorised  error"})
        }
        pic.quote =  req.body.quote || pic.quote;
        pic.device =  req.body.device || pic.device;
        pic.commentsCount = req.body.commentsCount || pic.commentsCount;

        await pic.save();

        res.status(201).json({mssg: "pic updated syuccessfully"});

    } catch (error) {
        res.status(500).json({message: " internqal server error"})
    }
})

router.delete('/picture/:id', authMiddleware, async(req, res) => {
    try {
        const pic = await Picture.findOne({_id : req.params.id});

        if(pic.userID.toString() !== req.userId){
            return res.status(401).json({message: " not authorised  error"})
        }
        const picc = await Picture.findOneAndDelete({_id : req.params.id});
        res.status(201).json({mssg: "pic removed syuccessfully"});

    } catch (error) {
        res.status(500).json({message: " internqal server error"})
    }
})
module.exports = router;