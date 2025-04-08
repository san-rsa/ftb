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





// user

router.get('/admin', auth, role(process.env.ADMIN), async(req, res)=> {

    const user = await  User.findOne({_id: req.userId})
  
    if (user.role !== process.env.ADMIN) {
        return res.status(403).json({ error: 'Forbidden' });
    } else if (user.role == process.env.ADMIN ) {
        return res.sendStatus(200);
    }


})


router.get('/team', auth, role(process.env.TEAM), async(req, res)=> {

  const user = await  User.findOne({_id: req.userId})
  

  if (user.role !== process.env.TEAM) {
      return res.status(403).json({ error: 'Forbidden' });
  } else if (user.role == process.env.TEAM ) {
      return res.sendStatus(200);
  }


})




//   // 




// 


router.get('/user/team', auth, async(req, res)=> {

      
    const team = await  Team.findOne({userId: req.userId})


    if (!team) {
      return res.status(404).json({ error: 'no team found' });

    } else if (team) {
      return  res.status(200).json({
        success: true,
       data: team
      })
    }

})




router.get('/user/team/all-players', auth, async(req, res)=> {

      
  const team = await  Team.findOne({userId: req.userId})




  if (!team) {
    return res.status(404).json({ error: 'no team found' });

  } else if (team) {

      const data = await Player.find({teamId: team.name}).sort("name")
    

    if (!data) {
      return res.status(404).json({ error: 'no players found' });

    } else if (data) {
      return  res.status(200).json({
        success: true,
       data: data
      })
    }




  }

})







router.get('/latest/fixture', auth, async(req, res)=> {

        
      const team = await  Team.findOne({userId: req.userId})
  
  
      if (!team) {
        return res.status(404).json({ error: 'no team found' });
      }  
   

  
    const data = []
    
     const year = await Fixture.findOne().sort({year: 'desc'})

     if (!year) {
      return res.status(404).json({ error: 'no year found' });
    } 

     const db = await Fixture.find({year: year.year}).sort('name').populate({path: "fixture.teams", populate: {path: "home"}  }).populate({path: "fixture.teams", populate: {path: "away"}})


      
      for (let x = 0; x < db.length; x++) {

        for (let i = 0; i < db[x].fixture.length; i++) {

          const Foundmatch = db[x].fixture[i].teams.findIndex(item => item.home._id == String(team._id) || item.away._id == String(team._id));
    
          if (Foundmatch !== -1 ) {
    
            data.push({
              regionId: db[x].competition,
              matchday: i + 1,
              match: db[x].fixture[i].teams[Foundmatch]
            })
          }
    
        }

      }


      const latest = _.orderBy(data, [item =>  item.match.day.date, item =>  item.match.day.time, ],);

      

      


     
     
          res.status(200).json({
             success: true,
            data: latest[0]
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




router.get('/teams', async(req, res)=> {

  const data = await Team.find().sort("name")
  
       res.status(200).json({
          success: true,
         data: data
        })
  })






  router.get('/teams/:id', async(req, res)=> {

    const data = await Team.find({regionId: req.params.id}).sort("name")
    
         res.status(200).json({
            success: true,
           data: data
          })
    })








router.get('/user', auth, async(req, res)=> {

  const user = await User.find({role: "user"})
  if (user) {
       return  res.status(200).json({
          success: true,
         data: user
        })
} else {
  return  res.status(400).json({
    success: false,
   message: "please try again can't find user"
  })
}

})



router.get('/user/team/:id', auth, async(req, res)=> {

  const user = await User.find({teamId: req.params.id})
  if (user) {
       return  res.status(200).json({
          success: true,
         data: user
        })
} else {
  return  res.status(400).json({
    success: false,
   message: "please try again can't find user"
  })
}

})





















module.exports = router;
