require('dotenv').config()
const Product = require('../../models/product')
const Category = require('../../models/category')
const User = require('../../models/user')

const Banner = require('../../models/banner')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
//const OTP = require('../../models/OTP')
// const Product = require('../models/product')
// const Product = require('../models/product')
 const {auth, role, uploadMiddleware} = require('../../middleware/mid')
 // const cloudinary = require("cloudinary");
const cloudinary = require('../../connection/cloudinary')
















 router.patch('/toadmin', auth, role(process.env.ADMIN), async (req, res, next) => {
    try {

        const data = await User.findByIdAndUpdate(req.body.productId, {
            $set: req.body, role: 'admin'
        }, { new: true });
        res.json(data);
    } catch (error) {
        return next(error);
    }
});





 



router.post('/banner', auth,  role(process.env.ADMIN), async (req, res)=> {

    const data = JSON.parse(req.body.data)
    const file = req.files.img  
      
    
    if (!req.files) {
        // No file was uploaded
        return res.status(400).json({ error: "No file uploaded" });
      }
     

    try {
        const {text}= data
        const imgUrl = []

        const image = await cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: 'Banner' },

      );


      imgUrl.push({url: image.secure_url,  imgId: image.public_id})

 
      

        // Check if All Details are there or not

		if (!text || !imgUrl ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}

        //check if use already exists?
        const existingItem = await Banner.findOne({text})
        if(existingItem){
            return res.status(400).json({
                success: false,
                message: "banner already exists"
            })
        }

        const banner = await Banner.create({
            text, imgUrl: imgUrl[0]
        })
            // res.redirect("/login")

        return res.status(200).json({
            success: true,
            banner,
            message: "banner created successfully ✅"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "banner registration failed"
        })
       
   }  
})




router.post('/category', auth, role(process.env.ADMIN), async (req, res)=> {

     const data = JSON.parse(req.body.data)
        const file = req.files.img 

    console.log(file);
            
        if (!req.files) {
            // No file was uploaded
            return res.status(400).json({ error: "No file uploaded" });
          }
         

    try {
            const {name}= data
            const imgUrl = []
    
            const image = await cloudinary.uploader.upload(
            file.tempFilePath,
            { folder: 'Category' },
          );
    
    
          imgUrl.push({url: image.secure_url,  imgId: image.public_id})
    
                          console.log(image)
    
    
        
        // Check if All Details are there or not

		if (!name || !imgUrl) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}

        //check if use already exists?
        const existingItem = await Category.findOne({name})
        if(existingItem){
            return res.status(400).json({
                success: false,
                message: "category  already exists"
            })
        }

        console.log(imgUrl);
        



        const cat = await Category.create({
            name, slug: name, imgUrl: imgUrl[0]
        })
        

        return res.status(200).json({
            success: true,
            cat,
            message: "category  created successfully ✅"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "category  registration failed"
        })
       
   }  
})






router.post('/product', auth, role(process.env.ADMIN), async(req, res)=> {
    try {
        const data = JSON.parse(req.body.data)
        const file = req.files.img    
        const imgUrl = []

        console.log(file.length)
        
        if (!req.files) {
            // No file was uploaded
            return res.status(400).json({ error: "No file uploaded" });
          }
    
    
    
          if (file.length > 1) {
    
                for (const i in file){
                  const image = await cloudinary.uploader.upload(
                    file[i].tempFilePath,
                    { folder: 'Product' },
    
                );
    
                imgUrl.push({url: image.secure_url,  imgId: image.public_id})
                console.log(image);
                }
              
                
          } else {
    
                 const image = await cloudinary.uploader.upload(
            file.tempFilePath,
            { folder: 'Product' },
    
          );
    
    
            imgUrl.push({url: image.secure_url,  imgId: image.public_id})
    
                          console.log(image)
    
    
          }
            console.log(imgUrl, )

            

        const {name,  description, categoryId, small, sprice, medium, mprice, large, lprice}= data

        console.log(name, imgUrl, description, categoryId, small, sprice, medium, mprice, large, lprice )
        // Check if All Details are there or not

		if (!name || !imgUrl ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}

        //check if use already exists?
        const existingItem = await Product.findOne({name})
        if(existingItem){
            return res.status(400).json({
                success: false,
                message: "product already exists"
            })
        }

    


        const product = await Product.create({
            name, imgUrl, description, categoryId, size:[{weight: small, price: sprice}, {weight: medium, price: mprice}, {weight: large, price: lprice}]

        })

        return res.status(200).json({
            success: true,
            product,
            message: "product created successfully ✅"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "product registration failed"
        })
       
   }  
})


































module.exports = router;
