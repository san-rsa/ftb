require('dotenv').config()
const Category = require('../models/category')
const Banner = require('../models/banner')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const {auth, role} = require('../middleware/mid')

//const OTP = require('../models/OTP')
const otpGenerator = require("otp-generator");
const User = require('../models/user')
const Wishlist = require('../models/wishlist')
const News = require('../models/news')
// const Product = require('../models/product')
// const Auth = require('../middleware/mid')




router.get('/banner', async(req, res)=> {

const banner = await Banner.find({})

     res.status(200).json({
        success: true,
       data: banner
      })
})



router.get('/category', async(req, res)=> {

const category = await Category.find({})

      res.status(200).json({
        success: true,
       data: category
      })

})

router.get('/category/:id', async(req, res)=> {
    
  const data = await Product.find({categoryId: req.params.id})
        res.status(200).json({
          success: true,
         data: data
        })
  
  })

  

  router.get('/news', async(req, res)=> {

    const news = await News.find({})
    
         res.status(200).json({
            success: true,
           data: news
          })
    })

router.get('/wishlist', auth, async(req, res)=> {
  const user = req.userId

  
  const data = await Wishlist.findOne({userId: user}).populate({path: "products", populate: {path: "productId"}})
      res.status(200).json({
        success: true,
       data: data
      })

})

// user

router.get('/admin', auth, role(process.env.ADMIN), async(req, res)=> {

  const data = await User.find({role: "admin"})
  
   res.status(200).json({
    success: true,
   data: data
  })
})

router.get('/user', auth, async(req, res)=> {

  const user = await User.find({role: "user"})
      res.status(200).json({
        success: true,
       data: user
      })

})





















module.exports = router;
