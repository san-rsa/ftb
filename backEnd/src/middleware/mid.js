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



const auth = (req, res, next) => {
  const token = req.cookies.user;

  if (!token) {
    return res.sendStatus(403).clearCookie("user");
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = data.id;
    req.userRole = data.role;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};





const role =  (role)  => async (req, res, next) => {


  try {
    let user= await  User.findOne({_id: req.userId})

    
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



  function win(teamId, ws, ls ) {

    const team = existing.standing.findIndex(item => item.teams == teamId);

    const dif = ws - ls


    existing.standing[team].stats.played = existing.standing[team].stats.played + 1;
    existing.standing[team].stats.win = existing.standing[team].stats.win + 1;
    existing.standing[team].stats.points = existing.standing[team].stats.points + 3;
    existing.standing[team].stats.gd = existing.standing[team].stats.gd + dif
    existing.standing[team].stats.gs = existing.standing[team].stats.gs + Number(ws);
    existing.standing[team].stats.ga = existing.standing[team].stats.ga + Number(ls);

    existing.standing[team].stats.form.push('W')
    


  }



  function loss(teamId, ws, ls) {

    const team = existing.standing.findIndex(item => item.teams == teamId);


    const dif = ls - ws

    existing.standing[team].stats.played = existing.standing[team].stats.played + 1;
    existing.standing[team].stats.loss = existing.standing[team].stats.loss + 1;
    existing.standing[team].stats.gd = existing.standing[team].stats.gd + dif
    existing.standing[team].stats.gs = existing.standing[team].stats.gs + Number(ls);
    existing.standing[team].stats.ga = existing.standing[team].stats.ga + Number(ws);


    existing.standing[team].stats.form.push('L')


  }






  function draw(teamId, ws, ls) {

    const team = existing.standing.findIndex(item => item.teams == teamId);


    existing.standing[team].stats.played = existing.standing[team].stats.played + 1;
    existing.standing[team].stats.draw = existing.standing[team].stats.draw + 1;
    existing.standing[team].stats.points = existing.standing[team].stats.points + 1;
    existing.standing[team].stats.gs = existing.standing[team].stats.gs + Number(ws);
    existing.standing[team].stats.ga = existing.standing[team].stats.ga + Number(ls);

    existing.standing[team].stats.form.push('D')


  }

  
  function update() {


    
    if (hms > aws) {

      win(h, hms, aws )
      loss(a, hms, aws)
                  

    } else if (hms < aws) {
      
      win(a, aws, hms )
      loss(h, aws, hms)



    } else if (hma == aws ) {
      draw(h, hms, aws )
      draw(a, hms, aws)
    }
      
  }

   const stats = {win: 0, loss: 0, draw: 0, gd: 0, point: 0, play: 0,  }




  
          
     
  
          if (existing) {
              //---- Check if index exists ----

              const FoundGroup = existing.group.findIndex(item => item.group == group );

              const FoundHome = existing.group[FoundGroup].standing.findIndex(item => item.teams == h);
              const Foundaway = existing.group[FoundGroup].standing.findIndex(item => item.teams == a);


  
  
              console.log(FoundHome, Foundaway);
              

              if (FoundGroup !== -1) {
                if (FoundHome == -1 || Foundaway == -1) {
                
                  if (FoundHome == -1 ) {
                        existing.group[FoundGroup].standing.push({teams: h, stats }) 
                    }
  
                  if ( Foundaway == -1) {
                      existing.group[FoundGroup].standing.push({teams: a, stats }) 
                    }
  
  
                  update()
  
                }
              }

              else if ( FoundGroup == -1)  {
                existing.group.push({
                  group: group, standing: [{teams: h, stats: stats}, {teams: a, stats: stats}]
                })

                update()
              }



              else if (FoundHome !== -1 && Foundaway !== -1  ) {
               update()
        

              }
                 console.log(existing, 'tt', );
                 

            
              const save = await existing.save();


             return  save
             
             
          }
          //------------ This creates a new cart and then adds the item to the cart that has been created------------
          else {
  
  

      
              const save = await table.create({
                  competition, year,
              })





              const stats = {win: 0, loss: 0, draw: 0, gd: 0, point: 0, play: 0,  }

               
            
              

                          //---- Check if index exists ----
            
                          const FoundGroup = existing.group.findIndex(item => item.group == group );
                          const FoundHome = save.standing.findIndex(item => item.teams == h);
                          const Foundaway = save.standing.findIndex(item => item.teams == a);
            
            
              
              
                          console.log(FoundHome, Foundaway);
                          
            
                           if ( FoundGroup == -1)  {
                            existing.group.push({
                              group: group, standing: [{teams: h, stats: stats}, {teams: a, stats: stats}]
                            })
            
                    
                          }
            
            
                            update()


                          
            

                          
                             
            
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





async function updateStanding(table, competition, year, h, hms, a, aws, res, next ) {

  try {


  if (!competition || !h || !hms || !aws || !a) {
    return res.status(403).json({
      success: false,
      message: "All Fields are required",
    });
  }





      const existing = await table.findOne({competition, year})



  function win(teamId, ws, ls ) {

    const team = existing.standing.findIndex(item => item.teams == teamId);

    const dif = ws - ls


    existing.standing[team].stats.played = existing.standing[team].stats.played + 1;
    existing.standing[team].stats.win = existing.standing[team].stats.win + 1;
    existing.standing[team].stats.points = existing.standing[team].stats.points + 3;
    existing.standing[team].stats.gd = existing.standing[team].stats.gd + dif
    existing.standing[team].stats.gs = existing.standing[team].stats.gs + Number(ws);
    existing.standing[team].stats.ga = existing.standing[team].stats.ga + Number(ls);

    existing.standing[team].stats.form.push('W')
    


  }



  function loss(teamId, ws, ls) {

    const team = existing.standing.findIndex(item => item.teams == teamId);


    const dif = ls - ws

    existing.standing[team].stats.played = existing.standing[team].stats.played + 1;
    existing.standing[team].stats.loss = existing.standing[team].stats.loss + 1;
    existing.standing[team].stats.gd = existing.standing[team].stats.gd + dif
    existing.standing[team].stats.gs = existing.standing[team].stats.gs + Number(ls);
    existing.standing[team].stats.ga = existing.standing[team].stats.ga + Number(ws);


    existing.standing[team].stats.form.push('L')


  }






  function draw(teamId, ws, ls) {

    const team = existing.standing.findIndex(item => item.teams == teamId);


    existing.standing[team].stats.played = existing.standing[team].stats.played + 1;
    existing.standing[team].stats.draw = existing.standing[team].stats.draw + 1;
    existing.standing[team].stats.points = existing.standing[team].stats.points + 1;
    existing.standing[team].stats.gs = existing.standing[team].stats.gs + Number(ws);
    existing.standing[team].stats.ga = existing.standing[team].stats.ga + Number(ls);

    existing.standing[team].stats.form.push('D')


  }

  function update() {


    
    if (hms > aws) {

      win(h, hms, aws )
      loss(a, hms, aws)
                  

    } else if (hms < aws) {
      
      win(a, aws, hms )
      loss(h, aws, hms)



    } else if (hma == aws ) {
      draw(h, hms, aws )
      draw(a, hms, aws)
    }
      
  }

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


                update()

              }




              else if (FoundHome !== -1 && Foundaway !== -1  ) {
               update()
        

              }
                 console.log(existing, 'tt', );
                 

            
              const save = await existing.save();


             return  save
             
             
          }
          //------------ This creates a new cart and then adds the item to the cart that has been created------------
          else {
  
  

      
              const save = await table.create({
                  competition, year,
              })





              const stats = {win: 0, loss: 0, draw: 0, gd: 0, point: 0, play: 0,  }

               
            
              

                          //---- Check if index exists ----
            
                          const FoundHome = save.standing.findIndex(item => item.teams == h);
                          const Foundaway = save.standing.findIndex(item => item.teams == a);
            
            
              
              
                          console.log(FoundHome, Foundaway);
                          
            
                          if (FoundHome == -1 || Foundaway == -1) {
                            
                            if (FoundHome == -1 ) {
                                  existing.standing.push({teams: h, stats }) 
                              }
            
                            if ( Foundaway == -1) {
                                existing.standing.push({teams: a, stats }) 
                              }
            
            
                            update()


                          }
            

                          
                             
            
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





  // try {
  //   let user= await  User.findOne({_id: req.userId})

    
  //   if (user.role !== role) {
  //     return res.status(403).json({ error: 'Forbidden' });
  //   }
    
  //   next();
  // } catch (error) {
  //   console.error('Error authorizing user:', error);
  //   res.status(500).json({ error: 'An error occurred while authorizing the user' });
  // }











module.exports = {  auth, role, deleteFixture, updateStanding, updateCupStanding};