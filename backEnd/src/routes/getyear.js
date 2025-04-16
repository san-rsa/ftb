require('dotenv').config()
const Banner = require('../models/news/banner')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const {auth, role} = require('../middleware/mid')

//const OTP = require('../models/OTP')
const otpGenerator = require("otp-generator");
const User = require('../models/user')
const Wishlist = require('../models/wishlist')
const News = require('../models/news/news')
const Team = require('../models/competition/team')
const Fixture = require('../models/competition/fixture')
const _ = require('lodash')
const Standing = require('../models/competition/standing/standing')
const Result = require('../models/competition/result')
const Codeofconduct = require('../models/news/codesofconduct')
const Live = require('../models/competition/live')
const CupStanding = require('../models/competition/standing/cup')
const Competition = require('../models/competition/competition')
const Stat = require('../models/competition/stats')
const Player = require('../models/competition/player')
const Sub_Region = require('../models/competition/competition-location')

// const Product = require('../models/product')
// const Auth = require('../middleware/mid')




router.get('/result/years', async(req, res)=> {


  const  data = []
    
    const db = await Result.find().select("year").sort({year: "desc"})

    for (let i = 0; i < db.length; i++) {
      const element = db[i].year;

      if (!data.includes(element)) {
         data.push(element);
     }      
    }
 
 
         res.status(200).json({
            success: true,
           data: data
          })
 })


 router.get('/standing/years', async(req, res)=> {


   const  data = []
     
     const db = await Standing.find().select("year").sort({year: "desc"})
 
     for (let i = 0; i < db.length; i++) {
       const element = db[i].year;
 
       if (!data.includes(element)) {
          data.push(element);
      }      
     }
  
  
          res.status(200).json({
             success: true,
            data: data
           })
  })










router.get('/:link/stats/years', async(req, res)=> {


  const { link, } = req.params
   
   const db = await Stat.find({competition: link,}).select("year").sort({year: "desc"})


        res.status(200).json({
           success: true,
          data: db
         })
})


 router.get('/:link/result/years', async(req, res)=> {


  const { link, } = req.params
   
   const db = await Result.find({competition: link,}).select("year").sort({year: "desc"})


        res.status(200).json({
           success: true,
          data: db
         })
})


router.get('/:link/standing/years', async(req, res)=> {

  const { link} = req.params

  const region = await Competition.findOne({name: link,})

  if (region.type == "league") {
   const data = await Standing.find({competition: link, }).select("year").sort({year: "desc"})
   

        res.status(200).json({
           success: true,
          data: data
         })

    
  } 
  
  else if (region.type == "cup") {
       

   const data = await CupStanding.find({competition: link, }).select("year").sort({year: "desc"})
 
           res.status(200).json({
              success: true,
             data: data
            })
 
 
       
    
  }
  

 

})






// d rest not years 


router.get('/getregions/player/:id', async(req, res)=> {

   const name = req.params.id.split(" ");

   const fullname = {first: name[0], last: name[1] }
 
   const player = await Player.findOne({name: fullname,})
 
   const data = await Team.findOne({name: player.teamId, }).select("regionId")


   if (data) {
    
 
         res.status(200).json({
            success: true,
           data: data.regionId
          })
 
     
   } 
   
 
 })



 router.get('/getregions/team/:id', async(req, res)=> {


   const data = await Team.findOne({name: req.params.id, }).select("regionId")


   if (data) {
    
 
         res.status(200).json({
            success: true,
           data: data.regionId
          })
 
     
   } 
   
 
 })














module.exports = router;
