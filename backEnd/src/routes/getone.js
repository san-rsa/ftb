require('dotenv').config()
const Product = require('../models/product')
const Category = require('../models/category')
const Wishlist = require('../models/wishlist')
const Cart = require('../models/cart')
const Banner = require('../models/banner')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
//const OTP = require('../models/OTP')
const otpGenerator = require("otp-generator");
const User = require('../models/user')
// const Product = require('../models/product')
const {auth} = require('../middleware/mid')






// UPDATE 
router.get('/banner/:id', auth, async (req, res, next) => {


        try {
            const data = await Banner.findById(req.params.id)

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    })


    router.get('/checkout', auth, async(req, res)=> {
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
  
              router.get('/category/:id', async(req, res)=> {
    
                const data = await Category.findById(req.params.id)
                      res.status(200).json(data)
                
                })

    router.get('/order/:id', auth, async (req, res, next) => {
        const user = req.userId

        try {
            const data = await User.findById(user)
            res.json(data);
        } catch (error) {
            return next(error);
        }
    })

    router.get('/product/:id', async (req, res, next) => {
        try {
            const data = await Product.findOne({name: req.params.id})
            res.json(data);
        } catch (error) {
            return next(error);
        }
    })






    
router.get("/wishlist/:id", auth, async (req, res) => {
    const user = req.userId
    const productId = req.params.id

    try {
        const wishlist = await Wishlist.findOne({ userId: user });
        const productDetails = await Product.findOne({ name: productId });

   
        //}
        //--If Cart Exists ----


        if (!wishlist) {
            return res.status(200).json({
                type: "success",
                mgs: "Process not added",
                data: "false"
            })  
        }
        


        if (wishlist) {
            //---- Check if index exists ----
            const indexFound = wishlist.products.findIndex(item => item.name == productDetails.name);



            console.log(wishlist, indexFound,  productDetails.name, productId) 

            // //----Check if quantity is greater than 0 then add item to items array ----
            if (indexFound == -1 ) {

            return res.status(200).json({
                            type: "success",
                            mgs: "Process not added..",
                            data: "false"
                        })  
            
            }


        }
        //------------ This creates a new cart and then adds the item to the cart that has been created------------

        return res.status(200).json({
            type: "success",
            mgs: "Process added",
                data: "true"
                })
           

                    
       // }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
});




    router.get('/user', auth, async (req, res, next) => {

        const user = req.userId
    


        try {
            const data = await User.findOne( {_id: user} )
            res.json(data);
        } catch (error) {
            return next(error);
        }
    })








module.exports = router;
