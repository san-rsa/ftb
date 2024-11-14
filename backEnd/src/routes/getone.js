require('dotenv').config()
const Banner = require('../models/news/banner')
const express = require('express')
const router = express.Router()
const jwt= require('jsonwebtoken')
const otpGenerator = require("otp-generator");
const User = require('../models/user')
const {auth} = require('../middleware/mid')
const Fixture = require('../models/competition/fixture')
const Result = require('../models/competition/result')
const _ = require('lodash')






// UPDATE 
router.get('/banner/:id', auth, async (req, res, next) => {


        try {
            const data = await Banner.findById(req.params.id)

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    })


    router.get('/:link/fixture/:id/:year', async(req, res)=> {


        const { link, id} = req.params
       
        let year = '2022' // new date().getFullYear()
    
        const data = {}
        
         const db = await Fixture.findOne({competition: link, year})
    
         if (!data) {
          year = year -1
    
          const data = await Fixture.findOne({competition: link, year})
    
        for (let i = 0; i < db.fixture.length; i++) {
    
          const Foundmatch = db.fixture[i].teams.findIndex(item => item._id == id);
    
          if (Foundmatch !== -1 ) {

            data.matchday = i + 1,
            data.match = db.fixture[i].teams[Foundmatch]
          }    
        }
    
         } else {
          
        for (let i = 0; i < db.fixture.length; i++) {
    
            const Foundmatch = db.fixture[i].teams.findIndex(item => item._id == id);
    
          if (Foundmatch !== -1 ) {
    
        data.matchday = i + 1,
        data.match = db.fixture[i].teams[Foundmatch]



       }
    
        }
       
         }
    
    
              res.status(200).json({
                 success: true,
                data: data
               })
         })









    router.get('/:link/result/:id/:year', async(req, res)=> {


            const { link, id} = req.params
           
            let year = '2022' // new date().getFullYear()
        
            const data = {}
            
             const db = await Result.findOne({competition: link, year})
        
             if (!data) {
              year = year -1
        
              const data = await Result.findOne({competition: link, year})
        
            for (let i = 0; i < db.result.length; i++) {
        
              const Foundmatch = db.result[i].teams.findIndex(item => item._id == id);
        
              if (Foundmatch !== -1 ) {
    
                data.matchday = i + 1,
                data.match = db.result[i].teams[Foundmatch]
              }    
            }
        
             } else {
              
            for (let i = 0; i < db.result.length; i++) {
        
                const Foundmatch = db.result[i].teams.findIndex(item => item._id == id);
        
              if (Foundmatch !== -1 ) {
        
            data.matchday = i + 1,
            data.match = db.result[i].teams[Foundmatch]
    
    
    
           }
        
            }
           
             }
        
        
                  res.status(200).json({
                     success: true,
                    data: data
                   })
             })
    


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
