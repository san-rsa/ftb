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
const Standing = require('../models/competition/standing')
const Result = require('../models/competition/result')

// const Product = require('../models/product')
// const Auth = require('../middleware/mid')




router.get('/banner', async(req, res)=> {

const banner = await Banner.find({})

     res.status(200).json({
        success: true,
       data: banner
      })
})



router.get('/:link/fixtures/:year', async(req, res)=> {


 const {link, year} = req.params

 // new date().getFullYear()

 
  const data = await Fixture.findOne({competition: link, year}).populate({path: "fixture.teams", populate: {path: "home"}  }).populate({path: "fixture.teams", populate: {path: "away"}})


  if (!data) {
   const years = year -1 ;

    const data = await Fixture.findOne({competition: link, year: years}).populate({path: "fixture.teams", populate: {path: "home"} }).populate({path: "fixture.teams", populate: {path: "away"}})

    const sort = _.sortBy(data.fixture, ['matchday']);
    data.fixture = sort

        
    return  res.status(200).json({
      success: true,
     data: data
    })
 

  } else {
       const sort = _.sortBy(data.fixture, ['matchday']);
   data.fixture = sort
 
  }
   
      return  res.status(200).json({
          success: true,
         data: data
        })

  })



  router.get('/:link/:team/fixtures/:year', async(req, res)=> {


    const { link, team} = req.params
   
    let year = '2022' // new date().getFullYear()

    const data = []
    
     const db = await Fixture.findOne({competition: link, year})

     if (!data) {
      year = year -1

      const data = await Fixture.findOne({competition: link, year})

    for (let i = 0; i < db.fixture.length; i++) {

      const Foundmatch = db.fixture[i].teams.findIndex(item => item.home == team || item.away == team);

      if (Foundmatch !== -1 ) {

        data.push({
          matchday: i + 1,
          match: db.fixture[i].teams[Foundmatch]
        })
      }    
    }

     } else {
      
    for (let i = 0; i < db.fixture.length; i++) {

      const Foundmatch = db.fixture[i].teams.findIndex(item => item.home == team || item.away == team);

      if (Foundmatch !== -1 ) {

        data.push({
          matchday: i + 1,
          match: db.fixture[i].teams[Foundmatch]
        })
      }

    }
   
     }


      const sort = _.sortBy(data.fixture, ['matchday']);
      data.fixture = sort


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



// user

router.get('/admin', auth, role(process.env.ADMIN), async(req, res)=> {

  const data = await User.find({role: "admin"})
  
   res.status(200).json({
    success: true,
   data: data
  })
})








router.get('/:link/results/:year', async(req, res)=> {


  const {link, year} = req.params


  
   const data = await Result.findOne({competition: link, year}).populate({path: "result.teams", populate: {path: "home"} }).populate({path: "result.teams", populate: {path: "away"}})

 
 
   if (!data) {
    const newyear = year -1 ;
 
     const data = await Result.findOne({competition: link, year: newyear}).populate({path: "result.teams", populate: {path: "home"} }).populate({path: "result.teams", populate: {path: "away"}})

 
     const sort = _.sortBy(data.result, ['matchday']);
     data.result = sort
  
        return  res.status(200).json({
           success: true,
          data: data
         })

   } else {
        const sort = _.sortBy(data.result, ['matchday']);
    data.result = sort

        
    return  res.status(200).json({
      success: true,
     data: data
    })
  
   }
    

   })










   router.get('/:link/:team/results/:year', async(req, res)=> {


    const { link, team} = req.params
   
    let year = '2022' // new date().getFullYear()

    const data = []
    
     const db = await Result.findOne({competition: link, year})

     if (!data) {
      year = year -1

      const data = await Result.findOne({competition: link, year})

    for (let i = 0; i < db.result.length; i++) {

      const Foundmatch = db.result[i].teams.findIndex(item => item.home == team || item.away == team);

      if (Foundmatch !== -1 ) {

        data.push({
          matchday: i + 1,
          match: db.result[i].teams[Foundmatch]
        })
      }    
    }
     

     } else {
      
    for (let i = 0; i < db.result.length; i++) {

      const Foundmatch = db.result[i].teams.findIndex(item => item.home == team || item.away == team);

      if (Foundmatch !== -1 ) {

        data.push({
          matchday: i + 1,
          match: db.result[i].teams[Foundmatch]
        })
      }

    }

     }
           const sort = _.sortBy(data.result, ['matchday']);
      data.result = sort
     
          res.status(200).json({
             success: true,
            data: data
           })
     })




router.get('/:link/standing/:year', async(req, res)=> {


  const {year, link} = req.params
 
  
 
 
   const data = await Standing.findOne({competition: link, year}).populate({path: "standing", populate: {path: "teams"}})
   
  
    if (!data) {

      const years = year - 1

      const data = await Standing.findOne({competition: link, year : years}).populate({path: "standing", populate: {path: "teams"}})


      const sort = _.orderBy(data.standing, [item =>  item.stats.points, item =>  item.stats.gd, item =>  item.stats.gs, item =>  item.stats.ga], ['desc', 'desc', 'desc', 'asc']);


      data.standing = sort
   
   
     
     
          res.status(200).json({
             success: true,
            data: data
           })


      
    } else {
          const sort = _.orderBy(data.standing, [item =>  item.stats.points, item =>  item.stats.gd, item =>  item.stats.gs, item =>  item.stats.ga], ['desc', 'desc', 'desc', 'asc']);


    data.standing = sort
 
 
   
   
        res.status(200).json({
           success: true,
          data: data
         })
    }
   })




router.get('/team', async(req, res)=> {

  const data = await Team.find().sort("name")
  
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
