let middlewareObject = {};
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());


const jwt = require('jsonwebtoken')
const User = require('../models/user')
//a middleware to check if a user is logged in or not

const cloudinary = require("../connection/cloudinary");
const Standing = require("../models/competition/standing/standing");

const {update} = require("./stats");
const Fixture = require("../models/competition/fixture");



const auth = async (req, res, next)  =>  {
  const token = await req.cookies.user;

  try {

      if (!token) {
     res.sendStatus(403).clearCookie("user");
     next()
  } else { 
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = data.id;
     next();
  }
  } catch {
    // res.sendStatus(403);
  }
};





const role =  (role)  => async (req, res, next) => {


  try {
    const user = await  User.findOne({_id: req.userId})

    
    if (user.role !== role) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
   return next();
  } catch (error) {
    console.error('Error authorizing user:', error);
    res.status(500).json({ error: 'An error occurred while authorizing the user' });
  }

}



  
   async function deleteFixture(fix, day, delAll, fixtureId) {
    const deleteFix = fix.fixture[day]?.teams?.length
    const deleteAllFix = fix.fixture.length


    
    fix.fixture[day]?.teams.pull(fixtureId)



        console.log(deleteFix, deleteAllFix);


        if (deleteFix === undefined || deleteFix == 0 || !Array.isArray(deleteFix) || !deleteFix) {
            const id = fix.fixture[day]?._id
                fix.fixture.pull(id)

                console.log(id);


        }



        
         if (deleteAllFix === undefined || deleteAllFix == 0 || !Array.isArray(deleteAllFix) || !deleteAllFix) {
                const id = fix._id

           await delAll.findByIdAndDelete(id)

            console.log(id);
        }

       fix.save()

}





async function updateCupStanding(table, competition, year, h, hms, a, aws, group, res, next ) {



  try {


  if (!competition || !h || !hms || !aws || !a) {
    return res.status(403).json({
      success: false,
      message: "All Fields are required",
    });
  }





      const existing = await table.findOne({competition, year})


      const stats = {win: 0, loss: 0, draw: 0, gd: 0, point: 0, play: 0,  }




  
          
     
  
          if (existing) {
              //---- Check if index exists ----
              console.log(competition, year, h, hms, a, aws, group, );

              const FoundGroup = existing?.group.findIndex(item => item.group == group );

              const FoundHome = existing.group[FoundGroup]?.standing.findIndex(item => item.teams == h);
              const Foundaway = existing.group[FoundGroup]?.standing.findIndex(item => item.teams == a);


  
  
              console.log(FoundHome, Foundaway , 'hhhhhhhhhhhh');
              

              if (FoundGroup !== -1) {
                if (FoundHome == -1 || Foundaway == -1) {
                
                  if (FoundHome == -1 ) {
                        existing.group[FoundGroup].standing.push({teams: h, stats }) 
                    }
  
                  if ( Foundaway == -1) {
                      existing.group[FoundGroup].standing.push({teams: a, stats }) 
                    }
  
  
                   // update(existing, group, h, hms, aws,a)
  
                }
              }

              else if ( FoundGroup == -1)  {
                existing.group.push({
                  group: group, standing: [{teams: h, stats: stats}, {teams: a, stats: stats}]
                })

               // update(existing, group, h, hms, aws,a)
              }



              else if (FoundHome !== -1 && Foundaway !== -1  ) {
        

              }
                 

                update(existing, group, h, hms, aws,a)

                 console.log(existing, 'tt', );

            
              const save = await existing.save();

              


           
             
             
          }
          //------------ This creates a new cart and then adds the item to the cart that has been created------------
          else {
  
              const save = await table.create({
                  competition, year, group: [{group: group, standing: [{teams: h, stats: stats}, {teams: a, stats: stats}]}]

              })

            
                    update(save, group, h, hms, aws,a)


                          
            

                          
                             
            
                         await save.save();

                        
                  // res.redirect("/login")

                       
             // return save
              
          }


  } catch (error) {
      console.error(error)
      return res.status(500).json({
          success: false,
          message : "registration failed"
      })
     
 }  



}





async function updateStanding(table, competition, year, h, hms, a, aws, res, next ) {

  try {


  if (!competition || !h || !hms || !aws || !a) {
    return res.status(403).json({
      success: false,
      message: "All Fields are required",
    });
  }





      const existing = await table.findOne({competition, year})


   const stats = {win: 0, loss: 0, draw: 0, gd: 0, point: 0, play: 0,  }




  
          
     
  
          if (existing) {
              //---- Check if index exists ----

              const FoundHome = existing.standing.findIndex(item => item.teams == h);
              const Foundaway = existing.standing.findIndex(item => item.teams == a);


  
  
              console.log(FoundHome, Foundaway);
              

              if (FoundHome == -1 || Foundaway == -1) {
                
                if (FoundHome == -1 ) {
                      existing.standing.push({teams: h, stats }) 
                  }

                if ( Foundaway == -1) {
                    existing.standing.push({teams: a, stats }) 
                  }

              }

                 
                update(existing, group, h, hms, aws,a)

            
              const save = await existing.save();


             return  save
             
             
          }
          //------------ This creates a new cart and then adds the item to the cart that has been created------------
          else {
  
  

      
              const save = await table.create({
                  competition, year, standing: [{teams: h, stats: stats}, {teams: a, stats: stats}]
              })

              
              
            
                              update(save, group, h, hms, aws,a)

            
                         await save.save();

                        
                  // res.redirect("/login")

                       
              return save
              
          }


  } catch (error) {
      console.error(error)
      return res.status(500).json({
          success: false,
          message : "registration failed"
      })
     
 }  



}




  const firstHalf = async (id, matchId, day, ) => {
    // do something

    const existing = await Fixture.findById(id)


    



    const Foundmatchday = existing.fixture.findIndex(item => item.matchday == day);
    const Foundmatch = existing.fixture[Foundmatchday].teams.findIndex(item => item._id == String(matchId));



    const time = existing.fixture[Foundmatchday].teams[Foundmatch].time

    console.log(id, existing, time);



    existing.fixture[Foundmatchday].teams[Foundmatch].live = true

    existing.fixture[Foundmatchday].teams[Foundmatch].half = "live"





   const timer = async () => {

            if (time.now <= time.first) {
        // Models.post.Post.findOneAndUpdate({ _id: res._id }, { $inc: { 'time.now': 1 } }, {new: true })
         
        time.now = time.now + 1;      
        
        
       setTimeout(timer, 1000);
 
 
 
     } else {
         clearTimeout(timer)

         existing.fixture[Foundmatchday].teams[Foundmatch].half = "half time"

         existing.fixture[Foundmatchday].teams[Foundmatch].live = false

         time.now = 45
         time.first = 45
         time.second = 90
         time.firstET = 105
         time.secondET = 120


     }    
     existing.save()
    } 

    timer()

    



  };





  const secondHalf = async (id, matchId, day, ) => {
    // do something

    const existing = await Fixture.findById(id)



    const Foundmatchday = existing.fixture.findIndex(item => item.matchday == day);
    const Foundmatch = existing.fixture[Foundmatchday].teams.findIndex(item => item._id == String(matchId));



    const time = existing.fixture[Foundmatchday].teams[Foundmatch].time

    existing.fixture[Foundmatchday].teams[Foundmatch].live = true

    existing.fixture[Foundmatchday].teams[Foundmatch].half = "live"


    const timer = async () => {

      if (time.now <= time.second) {
   
  time.now = time.now + 1; 
  
  console.log("rrrrrr", time);
  
  
  
 setTimeout(timer, 1000);



} else {
   clearTimeout(timer)


   existing.fixture[Foundmatchday].teams[Foundmatch].live = false

   existing.fixture[Foundmatchday].teams[Foundmatch].half = "full time"

   time.now = 90
   time.first = 45
   time.second = 90
   time.firstET = 105
   time.secondET = 120
}    
existing.save()
} 

timer()


  };


  const extraTimeFirstHalf = async (id, matchId, day, ) => {
    // do something

    const existing = await Fixture.findById(id)



    const Foundmatchday = existing.fixture.findIndex(item => item.matchday == day);
    const Foundmatch = existing.fixture[Foundmatchday].teams.findIndex(item => item._id == String(matchId));



    const time = existing.fixture[Foundmatchday].teams[Foundmatch].time

    existing.fixture[Foundmatchday].teams[Foundmatch].live = true

    existing.fixture[Foundmatchday].teams[Foundmatch].half = "live"


    const timer = async () => {

      if (time.now <= time.firstET) {
  // Models.post.Post.findOneAndUpdate({ _id: res._id }, { $inc: { 'time.now': 1 } }, {new: true })
   
  time.now = time.now + 1; 
  
  console.log("rrrrrr", time);
  
  
  
 setTimeout(timer, 1000);



} else {

  existing.fixture[Foundmatchday].teams[Foundmatch].live = false

  existing.fixture[Foundmatchday].teams[Foundmatch].half = "half time AET"

  time.now = 105

  time.first = 45
  time.second = 90
  time.firstET = 105
  time.secondET = 120


   clearTimeout(timer)
}    
existing.save()
} 

timer()


  };


  
  const extraTimeSecondHalf = async (id, matchId, day, ) => {
    // do something

    const existing = await Live.findById(id)



    const Foundmatchday = existing.fixture.findIndex(item => item.matchday == day);
    const Foundmatch = existing.fixture[Foundmatchday].teams.findIndex(item => item._id == String(matchId));



    const time = existing.fixture[Foundmatchday].teams[Foundmatch].time


    existing.fixture[Foundmatchday].teams[Foundmatch].live = true

    existing.fixture[Foundmatchday].teams[Foundmatch].half = "live"


    const timer = async () => {

      if (time.now <= time.second) {
  // Models.post.Post.findOneAndUpdate({ _id: res._id }, { $inc: { 'time.now': 1 } }, {new: true })
   
  time.now = time.now + 1; 
  
  console.log("rrrrrr", time);
  
  
  
 setTimeout(timer, 1000);



} else {

  existing.fixture[Foundmatchday].teams[Foundmatch].live = false

  existing.fixture[Foundmatchday].teams[Foundmatch].half = "full time AET"


   clearTimeout(timer)


   time.now = 120
   time.first = 45
   time.second = 90
   time.firstET = 105
   time.secondET = 120


}    
existing.save()
} 

timer()


  };









module.exports = {  auth, role, deleteFixture, updateStanding, updateCupStanding, firstHalf, secondHalf, extraTimeFirstHalf, extraTimeSecondHalf};