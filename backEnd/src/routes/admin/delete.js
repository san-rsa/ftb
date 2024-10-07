require('dotenv').config()
const Product = require('../../models/product')
const Category = require('../../models/category')
const Banner = require('../../models/banner')
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



router.delete('/cart/:id', auth, role(process.env.ADMIN), async (req, res, next) => {
    try {
        const data = await Banner.findByIdAndDelete(req.params.id);
        res.status(200).json({
            msg: data,
        });
    } catch (error) {
        return next(error);
    }
});



router.delete('/category', auth, role(process.env.ADMIN), async (req, res, next) => {

    const id = req.body.productId

    try {

        const data = await Category.findById(id);


        await cloudinary.uploader.destroy(data.imgUrl.imgId);

        data.remove()


        res.status(200).json({
            msg: data,
        });
    } catch (error) {
        return next(error);
    }
});


router.delete('/order/:id', auth, role(process.env.ADMIN), async (req, res, next) => {
    try {
        const data = await Banner.findByIdAndRemove(req.params.id);
        res.status(200).json({
            msg: data,
        });
    } catch (error) {
        return next(error);
    }
});


router.delete('/product/', auth, role(process.env.ADMIN), async (req, res, next) => {
    try {
        const id = req.body.productId
        const data = await Product.findOneAndDelete({name: id});
        res.status(200).json({
            msg: data,
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




