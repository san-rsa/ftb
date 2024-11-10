require('dotenv').config()
const User = require('../../models/user')
const Banner = require('../../models/news/banner')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
//const OTP = require('../../models/OTP')
// const Product = require('../models/product')
// const Product = require('../models/product')
 const {auth, role, uploadMiddleware, deleteFixture, updateStanding} = require('../../middleware/mid')
 // const cloudinary = require("cloudinary");
const cloudinary = require('../../connection/cloudinary')
const News = require('../../models/news/news')
const Competition = require('../../models/competition/competition')
const Team = require('../../models/competition/team')
const Player = require('../../models/competition/player')
const Fixture = require('../../models/competition/fixture')
const Result = require('../../models/competition/result')
const Standing = require('../../models/competition/standing')
















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
        const {head, body}= data
        const imgUrl = []

        const image = await cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: 'Banner' },

      );


      imgUrl.push({url: image.secure_url,  imgId: image.public_id})

 
      


        console.log(data)

		if (!head || !imgUrl ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}

        //check if use already exists?
        const existingItem = await Banner.findOne({head})
        if(existingItem){
            return res.status(400).json({
                success: false,
                message: "banner already exists"
            })
        }

        const banner = await Banner.create({
            head, body, imgUrl: imgUrl[0]
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



router.post('/competition', async (req, res)=> {

    const data = req.body //JSON.parse(req.body.data)
    const file = req.files.img  
      
    
    if (!req.files) {
        // No file was uploaded
        return res.status(400).json({ error: "No file uploaded" });
      }
     

    try {
        const {name, description}= data
        const logo = []

        const image = await cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: 'Banner' },

      );


      logo.push({url: image.secure_url,  imgId: image.public_id})

 
      


        console.log(data)

		if (!name || !logo ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}

        //check if use already exists?
        const existingItem = await Competition.findOne({name})
        if(existingItem){
            return res.status(400).json({
                success: false,
                message: "already exists"
            })
        }

        const save = await Competition.create({
           name, description, logo: logo[0]
        })
            // res.redirect("/login")

        return res.status(200).json({
            success: true,
            save,
            message: "created successfully ✅"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "registration failed"
        })
       
   }  
})




router.post('/fixtures',  async (req, res)=> {

    const data = req.body  //JSON.parse(req.body.data)

    try {
        const {competition, year, matchday, home, time, date, away}= data

        
        console.log(data)

		if (!year || !competition ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}




        const existing = await Fixture.findOne({competition, year})

        const teams = {home, time: {date, time}, away }

                    const fixture =  [{ matchday,
                    teams: teams   // teams: [{home, time: [{date, time,}], away } ]
    
    }]


            
       
    
            if (existing) {
                //---- Check if index exists ----

                 const Foundmatchday = existing.fixture.findIndex(item => item.matchday == matchday);
                 const FoundHome = existing.fixture[Foundmatchday].teams.findIndex(item => item.home == home);
                 const Foundaway = existing.fixture[Foundmatchday].teams.findIndex(item => item.away == away);

    
    
                // console.log(FoundHome, Foundaway, Foundmatchday);
                
    
                if (Foundmatchday == -1) {
                    
                    existing.fixture.push(fixture)
                }

                if (Foundmatchday !== -1) {


                   if (FoundHome == -1 && Foundaway == -1) {
                        existing.fixture[Foundmatchday].teams.push(teams) 

   
                    }


                else if (FoundHome !== -1 || Foundaway !== -1  ) {
                    
                   return  res.status(400).json({
                        type: "failed",
                        mgs: "team added choose different team",
  
                    })
                   }
                   console.log(existing, 'tt', );
                   

                }
                            




                const save = await existing.save();
               return  res.status(200).json({
                    type: "success",
                    mgs: "Process successful",
                    data: save
                })



                
            }
            //------------ This creates a new cart and then adds the item to the cart that has been created------------
            else {
    
    

        
                const save = await Fixture.create({
                    competition, year, fixture
                })
                    // res.redirect("/login")
        
                return res.status(200).json({
                    success: true,
                    save,
                    message: "created successfully ✅"
                   
                })  
            
                
            }


    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "registration failed"
        })
       
   }  

})


router.post('/news', auth,  role(process.env.ADMIN), async (req, res)=> {

    const data = JSON.parse(req.body.data)
    const file = req.files.img  
      
    
    if (!req.files) {
        // No file was uploaded
        return res.status(400).json({ error: "No file uploaded" });
      }
     

    try {
        const {head, body}= data
        const imgUrl = []

        const image = await cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: 'Banner' },

      );


      imgUrl.push({url: image.secure_url,  imgId: image.public_id})

 
      


        console.log(data)

		if (!head || !imgUrl ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}

        //check if use already exists?
        const existingItem = await News.findOne({head})
        if(existingItem){
            return res.status(400).json({
                success: false,
                message: "banner already exists"
            })
        }

        const banner = await News.create({
            head, body, imgUrl: imgUrl[0]
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






router.post('/player', auth,  role(process.env.ADMIN), async (req, res)=> {

    const data = JSON.parse(req.body.data)
    const file = req.files.img  
      
    
    if (!req.files) {
        // No file was uploaded
        return res.status(400).json({ error: "No file uploaded" });
      }
     

    try {
        const {name, description, teamId, position, number}= data
        const  picture = []

        const image = await cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: 'Banner' },

      );


      picture.push({url: image.secure_url,  imgId: image.public_id})

 
      


        console.log(data)

		if (!name || !picture ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}

        //check if use already exists?
        const existingItem = await Player.findOne({head})
        if(existingItem){
            return res.status(400).json({
                success: false,
                message: "already exists"
            })
        }

        const save = await Player.create({
           name, description, teamId, position, number, picture: picture[0]
        })
            // res.redirect("/login")

        return res.status(200).json({
            success: true,
            save,
            message: "created successfully ✅"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "registration failed"
        })
       
   }  
})








router.post('/result',  async (req, res)=> {

    const data = req.body  //JSON.parse(req.body.data)

    try {
        const {fixtureId, competitionId, matchday, homeScore, awayScore}= data



        const existingFix = await Fixture.findById(competitionId)

        

        const FoundmatchdayF = existingFix.fixture.findIndex(item => item.matchday == matchday);
       const Foundtime = existingFix.fixture[FoundmatchdayF].teams.findIndex(item => item._id == fixtureId);



        const {time, home, away} = existingFix.fixture[FoundmatchdayF].teams[Foundtime]

        const {competition, year} = existingFix

        
        console.log(data, time, home+'z', 'y'+away)

		if (!competition || !fixtureId || !competitionId || !homeScore || !awayScore) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}




        const existing = await Result.findOne({competition, year})


        const teams =     {
                home: String(home), homeScore: Number(homeScore), 
                time: {date: String(time.date), time: String(time.time)}, 
                awayScore: Number(awayScore), away: String(away) 
            }

                    const result =  [{ matchday,
                    teams: teams    // teams: [{home, time: [{date, time,}], away } ]
    
    }]




    
            
       
    
            if (existing) {
                //---- Check if index exists ----

                const Foundmatchday = existing.result.findIndex(item => item.matchday == matchday);
                const FoundHome = existing.result[Foundmatchday].teams.findIndex(item => item.home == home);
                const Foundaway = existing.result[Foundmatchday].teams.findIndex(item => item.away == away);


    
    
                console.log(FoundHome, Foundaway, Foundmatchday);
                
    
                if (Foundmatchday == -1) {
                    
                    existing.result.push(result)


                     updateStanding(Standing, competition, year, home, homeScore, away, awayScore, res )

                }

                if (Foundmatchday !== -1) {


                   if (FoundHome == -1 && Foundaway == -1) {

                    console.log(FoundHome, teams );
                    
                        existing.result[Foundmatchday].teams.push(teams ) 



                        //  updateStanding(Standing, competition, year, home, homeScore, away, awayScore, res)


   
                    }


                else if (FoundHome !== -1 || Foundaway !== -1  ) {
                    
                   return  res.status(400).json({
                        type: "failed",
                        mgs: "team added choose different team",
  
                    })
                   }
                   console.log(existing.result[Foundmatchday].teams, 'tt', );
                   

                }
                            





                const save = await existing.save();


                    deleteFixture(existingFix, FoundmatchdayF, Fixture, fixtureId)


                    updateStanding(Standing, competition, year, home, homeScore, away, awayScore, res )






               return  res.status(200).json({
                    type: "success",
                    mgs: "Process successful",
                    data: save
                })



                
            }
            //------------ This creates a new cart and then adds the item to the cart that has been created------------
            else {
    
    

        
                const save = await Result.create({
                    competition, year, result
                })
                    // res.redirect("/login")

                   
                    deleteFixture(existingFix, FoundmatchdayF, Fixture, fixtureId)
                    updateStanding(Standing, competition, year, home, homeScore, away, awayScore, res )

        
                return res.status(200).json({
                    success: true,
                    save,
                    message: "created successfully ✅"
                   
                })  
            
                
            }


    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "registration failed"
        })
       
   }  

})





router.post('/team', async (req, res)=> {

    const data = req.body //JSON.parse(req.body.data)
    const file = req.files.img  
      
    
    if (!req.files) {
        // No file was uploaded
        return res.status(400).json({ error: "No file uploaded" });
      }
     

    try {
        const {name, description}= data
        const logo = []

        const image = await cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: 'Banner' },

      );


      logo.push({url: image.secure_url,  imgId: image.public_id})

 
      


        console.log(data)

		if (!name || !logo ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}

        //check if use already exists?
        const existingItem = await Team.findOne({name})
        if(existingItem){
            return res.status(400).json({
                success: false,
                message: "already exists"
            })
        }

        const save = await Team.create({
           name, description, logo: logo[0]
        })
            // res.redirect("/login")

        return res.status(200).json({
            success: true,
            save,
            message: "created successfully ✅"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "registration failed"
        })
       
   }  
})



























module.exports = router;
