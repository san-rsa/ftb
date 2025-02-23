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
const {auth, role} = require('../../middleware/mid')
const cloudinary = require('../../connection/cloudinary')







router.patch('/admin' , auth, role(process.env.ADMIN), async (req, res, next) => {
    try {

        const data = await User.findByIdAndUpdate(req.body.productId, {
            $set: req.body, role: 'user'
        }, { new: true });
        res.json(data);
        console.log(data, "user updated successfully!");
    } catch (error) {
        return next(error);
    }
});


 

router.delete('/banner', auth, role(process.env.ADMIN), async (req, res, next) => {
    const id = req.body.productId

    try {

        const data = await Banner.findById(id);

        console.log(data);
        

        await cloudinary.uploader.destroy(data.imgUrl.imgId);

        const del = await Banner.findByIdAndDelete(id)


        res.status(200).json({
            msg: del,
        });
    } catch (error) {
        return next(error);
    }
});













router.delete('/user/:id', auth, role(process.env.ADMIN), async (req, res, next) => {
    try {
        const data = await User.findByIdAndRemove(req.params.id);
        res.status(200).json({
            msg: data,
        });
    } catch (error) {
        return next(error);
    }
});


// router.delete('/banner/:id', async (req, res, next) => {
//     try {
//         const data = await Banner.findByIdAndRemove(req.params.id);
//         res.status(200).json({
//             msg: data,
//         });
//     } catch (error) {
//         return next(error);
//     }
// });


// router.delete('/banner/:id', async (req, res, next) => {
//     try {
//         const data = await Banner.findByIdAndRemove(req.params.id);
//         res.status(200).json({
//             msg: data,
//         });
//     } catch (error) {
//         return next(error);
//     }
// });

module.exports = router;




