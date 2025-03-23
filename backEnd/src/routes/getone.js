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
const CupStanding = require('../models/competition/standing/cup')
const Competition = require('../models/competition/competition')
const Codeofconduct = require('../models/news/codesofconduct')
const News = require('../models/news/news')
const Live = require('../models/competition/live')
const Player = require('../models/competition/player')
const Team = require('../models/competition/team')
const Sub_Region = require('../models/competition/competition-location')





router.get('/banner/:id',  async (req, res, next) => {
  console.log(req.params.id +2);
  


        try {
            const data = await Banner.findOne({head: req.params.id})

            if (data) {
                
              res.status(200).json(data);

            } else {
              res.status(404).json("not found");

            }

        } catch (error) {
            res.status(500).json(error);
        }
})


router.get('/codes-of-conduct/:id', auth, async (req, res, next) => {


      try {
          const data = await Codeofconduct.findById(req.params.id)


          if (data) {
                
            res.status(200).json(data);

          } else {
            res.status(404).json("not found");

          }

      } catch (error) {
          res.status(500).json(error);
      }
})







router.get('/competition/:id', async (req, res) => {


      try {
          const data = await Competition.findOne({name: req.params.id})

          if (data) {
                
            res.status(200).json(data);

          } else {
            res.status(404).json("not found");

          }
      } catch (error) {
          res.status(500).json(error);
      }
})

router.get('/sub-competition/:id', async (req, res) => {


  try {
      const data = await Sub_Region.findOne({name: req.params.id})

      if (data) {
            
        res.status(200).json(data);

      } else {
        res.status(404).json("not found");

      }
  } catch (error) {
      res.status(500).json(error);
  }
})





router.get('/fixtures/year/:id', async (req, res) => {


  try {
      const data = await Fixture.findOne({competition: req.params.id}).sort({year: 'desc'}).populate({path: "fixture.teams", populate: {path: "home"}  }).populate({path: "fixture.teams", populate: {path: "away"}})


      if (data) {
            
        res.status(200).json(data);

      } else {
        res.status(404).json("not found");

      }
      console.log( data);



  } catch (error) {

    console.log(error, );
    
      res.status(500).json(error);
  }
})



router.get('/:link/group-stage/:groupName/:year', async(req, res)=> {

      const {year, link, groupName} = req.params
     
      
       const data = await CupStanding.findOne({competition: link, year}).populate({path: "group.standing", populate: {path: "teams"}})
  
       const groups = []
       
      
        if (!data) {
    
          const years = year - 1
    
          const data = await CupStanding.findOne({competition: link, year : years}).populate({path: "group.standing", populate: {path: "teams"}})
    
          const Foundgroup = data.group.findIndex(item => item.group == groupName);    
              
            const {group, standing} = data.group[Foundgroup]
            
            const stand =  _.orderBy(standing, [item =>  item.stats.points, item =>  item.stats.gd, item =>  item.stats.gs, item =>  item.stats.ga], ['desc', 'desc', 'desc', 'asc']);

            groups.push({group, standing: stand})
  
            console.log(stand);
            
  
     

       
              data.group =  groups
         
         
              res.status(200).json({
                 success: true,
                data: data
               })
    
    
          
        } else {  
  
              const Foundgroup = data.group.findIndex(item => item.group == groupName);    
              
              const {group, standing} = data.group[Foundgroup]
              
              const stand =  _.orderBy(standing, [item =>  item.stats.points, item =>  item.stats.gd, item =>  item.stats.gs, item =>  item.stats.ga], ['desc', 'desc', 'desc', 'asc']);
  
              groups.push({group, standing: stand})
              
  
  
              data.group =  groups
     
       
       
            res.status(200).json({
               success: true,
              data: data
             })
        }
})
  

router.get('/:link/fixture/:id/', async(req, res)=> {


        const { link, id, } = req.params
           
        const data = {}
        
         const db = await Fixture.findOne({competition: link }).sort({year: 'desc'}).populate({path: "fixture.teams", populate: {path: "home"}  }).populate({path: "fixture.teams", populate: {path: "away"}})

    
          
        for (let i = 0; i < db.fixture.length; i++) {
    
            const Foundmatch = db.fixture[i].teams.findIndex(item => item._id == id);
    
          if (Foundmatch !== -1 ) {
            
        data.info = {competition: db.competition, year: db.year, matchday: db.fixture[i].matchday, type: db.type } 
        data.match = db.fixture[i].teams[Foundmatch]



          }
        }
    
    
              res.status(200).json(data)
})


router.get('/:link/live/:id/:year', async(req, res)=> {


          const { link, id, year} = req.params
             
          const data = {}
          
           const db = await Live.findOne({competition: link, year})
      
           if (!data) {
            const year2 = year -1
      
            const data = await Live.findOne({competition: link, year: year2})
      
          for (let i = 0; i < db.live.length; i++) {
      
            const Foundmatch = db.live[i].teams.findIndex(item => item._id == id);
      
            if (Foundmatch !== -1 ) {
  
              data.matchday = i + 1,
              data.match = db.live[i].teams[Foundmatch]
            }    
          }
      
           } else {
            
          for (let i = 0; i < db.live.length; i++) {
      
              const Foundmatch = db.live[i].teams.findIndex(item => item._id == id);
      
            if (Foundmatch !== -1 ) {
      
          data.matchday = i + 1,
          data.match = db.live[i].teams[Foundmatch]
  
  
  
         }
      
          }
         
           }
      
      
                res.status(200).json({
                   success: true,
                  data: data
                 })
})
  

router.get('/news/:id', async (req, res, next) => {


          try {
              const data = await News.findOne({head: req.params.id})
  
              if (data) {
                
                res.status(200).json(data);
  
              } else {
                res.status(404).json("not found");
  
              }
             } catch (error) {
              res.status(500).json(error);
          }
})


router.get('/player/:id', async(req, res)=> {


      

        try {



        const name = req.params.id.split(" ");

        const fullname = {first: name[0], last: name[1] }


         const data = await Player.findOne({name: fullname}) //.sort("title")

        if (data) {
                
          res.status(200).json(data);

        } else {
          res.status(404).json("not found");

        }
        } catch (error) {

            res.status(500).json(error);

          }
        
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


router.get('/:link/stat/:player/:year', async(req, res)=> {


                  const {link, year, player} = req.params
                 
                  
                   const data = await Stat.findOne({competition: link, year}).populate({path: "stats", populate: {path: "home"}  }).populate({path: "fixture.teams", populate: {path: "away"}})
                 
                   const stat = [];
          
                 
                   if (!data) {
                    const years = year -1 ;
                 
                     const data = await Stat.findOne({competition: link, year: years}).populate({path: "stats", populate: {path: "home"} }).populate({path: "fixture.teams", populate: {path: "away"}})
                 
                     const Foundplayer = data.stats.findIndex(item => item.player == player);
                          
                     stat.push(data.stats[Foundplayer])
          
          
                     data.stats = stat
                 
                         
                     return  res.status(200).json({
                       success: true,
                      data: data
                     })
                  
                 
                   } else {
          
                        const Foundplayer = data.stats.findIndex(item => item.player == player);
                          
                        stat.push(data.stats[Foundplayer])
          
          
          
          
                     data.stats = stat
                   }
                    
                       return  res.status(200).json({
                           success: true,
                          data: data
                         })
                 
})


router.get('/:link/stats/:type/:year', async(req, res)=> {


              const {link, year, type} = req.params
             
              
               const data = await Stat.findOne({competition: link, year}).populate({path: "stats", populate: {path: "home"}  }).populate({path: "fixture.teams", populate: {path: "away"}})
             
               const stat = [];
      
             
               if (!data) {
                const years = year -1 ;
             
                 const data = await Stat.findOne({competition: link, year: years}).populate({path: "stats", populate: {path: "home"} }).populate({path: "fixture.teams", populate: {path: "away"}})
             
                 const sort = _.sortBy(data.stats, [type]);
      
                  for (let i = 0; i < sort.length; i++) {
                    const filter = sort[i][type];
      
                    if (filter !== 0) {
                      stat.push({player: sort[i].player, team: sort[i].team, stat: filter})
                    }
                    
                  }
      
      
      
      
                 data.stats = stat
             
                     
                 return  res.status(200).json({
                   success: true,
                  data: data
                 })
              
             
               } else {
                    const sort = _.sortBy(data.fixture, [type]);
      
                    
      
                    
                  for (let i = 0; i < sort.length; i++) {
                    const filter = sort[i][type];
      
                    if (filter !== 0) {
                      stat.push({player: sort[i].player, team: sort[i].team, stat: filter})
                    }
                    
                  }
      
      
      
      
                 data.stats = stat
               }
                
                   return  res.status(200).json({
                       success: true,
                      data: data
                     })
             
})


router.get('/:link/stats/:team/:type/:year', async(req, res)=> {


                const {link, year, type, team} = req.params
               
                
                 const data = await Stat.findOne({competition: link, year}).populate({path: "stats", populate: {path: "home"}  }).populate({path: "fixture.teams", populate: {path: "away"}})
               
                 const stat = [];
        
               
                 if (!data) {
                  const years = year -1 ;
               
                   const data = await Stat.findOne({competition: link, year: years}).populate({path: "stats", populate: {path: "home"} }).populate({path: "fixture.teams", populate: {path: "away"}})
               
                   const sort = _.sortBy(data.stats, [type]);
        
                    for (let i = 0; i < sort.length; i++) {
                      const filter1 = sort[i][type];
                      const filter2 = sort[i].team;
        
        
        
                      if (filter1 !== 0 && filter2 == team) {
                        stat.push({player: sort[i].player, team: sort[i].team, stat: filter1})
                      }
                      
                    }
        
        
        
        
                   data.stats = stat
               
                       
                   return  res.status(200).json({
                     success: true,
                    data: data
                   })
                
               
                 } else {
                      const sort = _.sortBy(data.fixture, [type]);
        
                      
        
                      
                      for (let i = 0; i < sort.length; i++) {
                        const filter1 = sort[i][type];
                        const filter2 = sort[i].team;
          
          
          
                        if (filter1 !== 0 && filter2 == team) {
                          stat.push({player: sort[i].player, team: sort[i].team, stat: filter1})
                        }
                        
                      }
        
        
        
        
                   data.stats = stat
                 }
                  
                     return  res.status(200).json({
                         success: true,
                        data: data
                       })
               
})


router.get('/team/:id', async(req, res)=> {

                  

                  try {
                    const data = await Team.findOne({name: req.params.id})//.populate("playerId") //.sort("title")


                    
                    if (data) {
                
                      res.status(200).json(data);
        
                    } else {
                      res.status(404).json("not found");
        
                    }
                  } catch (error) {
                      res.status(500).json(error )
                  }
                  

})



    


router.get('/user', auth, async (req, res, next) => {

        const user = req.userId
    


        try {
            const data = await User.findOne( {_id: user} )

            if (data) {
                
              res.status(200).json(data);

            } else {
              res.status(404).json("not found");

            }
        } catch (error) {
            return next(error);
        }
})



router.get('/user/:id', auth,  async(req, res)=> {


  const data = await User.findOne({_id: req.params.id})
  
   res.status(200).json(data)
})







module.exports = router;
