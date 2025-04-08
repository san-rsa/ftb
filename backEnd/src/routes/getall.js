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




router.get('/banner', async(req, res)=> {

const banner = await Banner.find().sort([['updatedAt', 'desc']]);
     res.status(200).json({
        success: true,
       data: banner
      })
})


router.get('/codes-of-conduct', async(req, res)=> {

  const data = await Codeofconduct.find({}) //.sort("title")
  
       res.status(200).json({
          success: true,
         data: data
        })
})




router.get('/competition', async(req, res)=> {

    const data = await Competition.find().sort("name")
    
         res.status(200).json({
            success: true,
           data: data
          })
})


router.get('/sub-competition', async(req, res)=> {

      const data = await Sub_Region.find().sort("name")
      
           res.status(200).json({
              success: true,
             data: data
            })
})





router.get('/:link/fixtures/', async(req, res)=> {


 const {link, } = req.params

 
  const data = await Fixture.findOne({competition: link,}).sort({year: 'desc'}).populate("fixture.teams.home", "name logo").populate("fixture.teams.away", "name logo")

   if (data) {
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


          res.status(200).json({
             success: true,
            data: data
           })
     })





       router.get('/stat/:player/:year', async(req, res)=> {


        const {year, player} = req.params
       
        
         const data = await Stat.find( year).populate({path: "stats", populate: {path: "home"}  }).populate({path: "fixture.teams", populate: {path: "away"}})
       
         const stat = [];

       
         if (!data) {
          const years = year -1 ;
       
           const data = await Stat.find({ year: years}).populate({path: "stats", populate: {path: "home"} }).populate({path: "fixture.teams", populate: {path: "away"}})
       
            for (let i = 0; i < data.length; i++) {

              const Foundplayer = data[i].stats.findIndex(item => item.player == player);

              if (Foundplayer !== -1) {
                
                stat.push({competition: data[i].competition, year: data[i].year, stat: data[i].stats[Foundplayer]})

              }
                
   
            }

           data.stats = stat
       
               
           return  res.status(200).json({
             success: true,
            data: data
           })
        
       
         } else {

          for (let i = 0; i < data.length; i++) {

            const Foundplayer = data[i].stats.findIndex(item => item.player == player);

            if (Foundplayer !== -1) {
              
              stat.push({competition: data[i].competition, year: data[i].year, stat: data[i].stats[Foundplayer]})

            }
              
 
          }




           data.stats = stat
         }
          
             return  res.status(200).json({
                 success: true,
                data: data
               })
       
})



router.get('/:link/stats/:team/:year', async(req, res)=> {


        const {link, year, team} = req.params
       
        
         const data = await Stat.findOne({competition: link, year}).populate({path: "stats", populate: {path: "home"}  }).populate({path: "fixture.teams", populate: {path: "away"}})
       
         const stat = [];

       
         if (!data) {
          const years = year -1 ;
       
           const data = await Stat.findOne({competition: link, year: years}).populate({path: "stats", populate: {path: "home"} }).populate({path: "fixture.teams", populate: {path: "away"}})
       
           const sort = _.sortBy(data.stats, [type]);

            for (let i = 0; i < sort.length; i++) {
              const filter = sort[i].team;



              if (filter == team) {
                stat.push(sort[i])
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
                const filter = sort[i].team;
  
  
                if (filter == team) {
                  stat.push(sort[i])
                }
                
              }




           data.stats = stat
         }
          
             return  res.status(200).json({
                 success: true,
                data: data
               })
       
})






router.get('/players', async(req, res)=> {

        const data = await Player.find({}) //.sort("title")
        
             res.status(200).json({
                success: true,
               data: data
              })
})



router.get('/players/:team', async(req, res)=> {

          const team = await Team.findOne({name: req.params.team}) 



          const data = await Player.find({teamId: team.name}).sort("name.first")


          console.log(team, data);
          
          
               res.status(200).json({
                  success: true,
                 data: data
                })
})





router.get('/news', async(req, res)=> {

    const news = await News.find({}).sort([['updatedAt', 'desc']]);
    
         res.status(200).json({
            success: true,
           data: news
          })
})





router.get('/news/team/:id', async(req, res)=> {

      const news = await News.find({ref_Team: req.params.id}).sort([['updatedAt', 'desc']]);
      
           res.status(200).json({
              success: true,
             data: news
            })
})


router.get('/news/region/:id', async(req, res)=> {

        const news = await News.find({ref_Region: req.params.id}).sort([['updatedAt', 'desc']]);
        
             res.status(200).json({
                success: true,
               data: news
              })
})















router.get('/:link/results/', async(req, res)=> {


  const {link, } = req.params
 
  
   const data = await Result.findOne({competition: link,}).sort({year: 'desc'}).populate("result.teams.home", "name logo").populate("result.teams.away", "name logo")
 
    if (data) {
        const sort = _.sortBy(data.result, ['matchday']);
    data.result = sort
  
   }
    
       return  res.status(200).json({
           success: true,
          data: data
         })
 
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
     
          res.status(200).json({
             success: true,
            data: data
           })
})




router.get('/:link/standing/:year', async(req, res)=> {

  const {year, link} = req.params

  const region = await Competition.findOne({name: link,})

  if (region.type == "league") {
   const data = await Standing.findOne({competition: link, year}).populate("standing.teams")
   
  
    if (!data) {

      const data = await Standing.findOne({competition: link,}).sort({year: 'desc'}).populate("standing.teams")

      const sort = _.orderBy(data.standing, [item =>  item.stats.points, item =>  item.stats.gd, item =>  item.stats.gs, item =>  item.stats.ga], ['desc', 'desc', 'desc', 'asc']);

      data.standing = sort
      data.type = region.type

   
          res.status(200).json({
             success: true,
            data: data
           })


      
    } else {
        
      const sort = _.orderBy(data.standing, [item =>  item.stats.points, item =>  item.stats.gd, item =>  item.stats.gs, item =>  item.stats.ga], ['desc', 'desc', 'desc', 'asc']);


      data.standing = sort
      data.type = region.type

 
   
   
        res.status(200).json({
           success: true,
          data: data
         })
    }

    
  } 
  
  else if (region.type == "cup") {
    const data = await CupStanding.findOne({competition: link, year}).populate({path: "group.standing", populate: {path: "teams"}})

    const groups = []
    
   
     if (!data) {
 
       const years = year - 1
 
       const data = await CupStanding.findOne({competition: link, }).sort({year: 'desc'}).populate("group.standing.teams")
 
 
       console.log(data);

       const sort = _.orderBy(data.group, [item =>  item.group, ], ['asc'], );
 
 
       for (let i = 0; i < sort.length; i++) {
           
         const {group, standing} = sort[i]
         
         
        const stand =  _.orderBy(standing, [item =>  item.stats.points, item =>  item.stats.gd, item =>  item.stats.gs, item =>  item.stats.ga], ['desc', 'desc', 'desc', 'asc']);

         groups.push({group, standing: stand})

         console.log(stand);
         

  
         
       }
    
           data.group =  groups
           data.type = region.type
      
      
           res.status(200).json({
              success: true,
             data: data
            })
 
 
       
     } else {
           const sort = _.orderBy(data.group, [item =>  item.group, ], [ 'asc']);


         for (let i = 0; i < sort.length; i++) {
           
           const {group, standing} = sort[i]
           
           
          const stand =  _.orderBy(standing, [item =>  item.stats.points, item =>  item.stats.gd, item =>  item.stats.gs, item =>  item.stats.ga], ['desc', 'desc', 'desc', 'asc']);

           groups.push({group, standing: stand})

        
           
         }
           
 

         
 

     data.group =  groups
     data.type = region.type

  
    
    
         res.status(200).json({
            success: true,
           data: data
          })
     }
  }
  

 

})


router.get('/:link/group-stage/:year', async(req, res)=> {

    const {year, link} = req.params
   
    
     const data = await CupStanding.findOne({competition: link, year}).populate({path: "group.standing", populate: {path: "teams"}})

     const groups = []
     
    
      if (!data) {
  
        const years = year - 1
  
        const data = await CupStanding.findOne({competition: link, year : years}).populate({path: "group.standing", populate: {path: "teams"}})
  
  
        const sort = _.orderBy(data.group, [item =>  item.group, ], ['asc'], );
  
  
        for (let i = 0; i < sort.length; i++) {
            
          const {group, standing} = sort[i]
          
          
         const stand =  _.orderBy(standing, [item =>  item.stats.points, item =>  item.stats.gd, item =>  item.stats.gs, item =>  item.stats.ga], ['desc', 'desc', 'desc', 'asc']);

          groups.push({group, standing: stand})

          console.log(stand);
          

   
          
        }
     
            data.group =  groups
       
       
            res.status(200).json({
               success: true,
              data: data
             })
  
  
        
      } else {
            const sort = _.orderBy(data.group, [item =>  item.group, ], [ 'asc']);


          for (let i = 0; i < sort.length; i++) {
            
            const {group, standing} = sort[i]
            
            
           const stand =  _.orderBy(standing, [item =>  item.stats.points, item =>  item.stats.gd, item =>  item.stats.gs, item =>  item.stats.ga], ['desc', 'desc', 'desc', 'asc']);

            groups.push({group, standing: stand})

         
            
          }
            
  

          
  

      data.group =  groups
   
     
     
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









// user

router.get('/admin', auth,  async(req, res)=> {

  const data = await User.find({role: "admin"})
  
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
