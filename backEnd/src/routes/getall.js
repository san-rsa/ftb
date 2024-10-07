require('dotenv').config()
const Product = require('../models/product')
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
const Cart = require('../models/cart')
const  Order  = require('../models/order')
// const Product = require('../models/product')
// const Auth = require('../middleware/mid')




router.get('/banner', async(req, res)=> {

const banner = await Banner.find({})

     res.status(200).json({
        success: true,
       data: banner
      })
})

router.get('/cart', auth, async(req, res)=> {
  const user = req.userId
  const data = await Cart.findOne({userId: user}).populate({path: "products", populate: {path: "productId"}})

  if (data && data.products.length > 0) {
     res.status(200).json({
        success: true,
       data: data
      })
  } else {
    res.send(null);
  }
 

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
router.get('/order', auth, async(req, res)=> {
  const user = req.userId

  
  const data = await Order.findOne({userId: user})
      res.status(200).json({
        success: true,
       data: data
      })

})

router.get('/product', async(req, res)=> {
    
const product = await Product.find({})
      res.status(200).json({
        success: true,
       data: product
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
