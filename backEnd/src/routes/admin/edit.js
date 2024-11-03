require('dotenv').config()
const Banner = require('../../models/news/banner')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
//const OTP = require('../../models/OTP')
const otpGenerator = require("otp-generator");
const User = require('../../models/user')
// const Product = require('../models/product')
// const Auth = require('../middleware/mid')
 const {auth, role} = require('../../middleware/mid')
 const cloudinary = require('../../connection/cloudinary')



 






    router.patch('/banner/:id' , auth, role(process.env.ADMIN), async (req, res, next) => {
        try {

            const update = JSON.parse(req.body.data)
            const file = req.files?.img    
            const imgUrl = []
    

            // await cloudinary.uploader.destroy(data.imgUrl.imgId);

            
            if (req.files) {
                // No file was uploaded
   
                const image = await cloudinary.uploader.upload(
                file.tempFilePath,
                { folder: 'Banner' },
        
              );        
                imgUrl.push({url: image.secure_url,  imgId: image.puplic_id})        
            }
        
        
        
            const data = await Banner.findByIdAndUpdate(req.params.id, {
                $set: update, imgUrl: imgUrl[0]
            }, { new: true });
            res.json(data);
            console.log(data, req.body, " updated successfully!");
        } catch (error) {
            return next(error);
        }
    });







    router.patch('/user/:id' , auth, role(process.env.ADMIN), async (req, res, next) => {
        try {

            const data = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.json(data);
            console.log(data, "user updated successfully!");
        } catch (error) {
            return next(error);
        }
    });







module.exports = router;
