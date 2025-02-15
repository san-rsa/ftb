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
 const {auth, role, uploadMiddleware, deleteFixture, updateStanding, updateCupStanding, secondHalf, extraTimeFirstHalf, extraTimeSecondHalf, firstHalf} = require('../../middleware/mid')
 // const cloudinary = require("cloudinary");
const cloudinary = require('../../connection/cloudinary')
const News = require('../../models/news/news')
const Competition = require('../../models/competition/competition')
const Team = require('../../models/competition/team')
const Player = require('../../models/competition/player')
const Fixture = require('../../models/competition/fixture')
const Result = require('../../models/competition/result')
const Standing = require('../../models/competition/standing/standing')
const Codeofconduct = require('../../models/news/codesofconduct')
const CupStanding = require('../../models/competition/standing/cup')
const Live = require('../../models/competition/live')









router.patch('/:competition/fixture/:id',  async (req, res)=> {

    const data = req.body  //JSON.parse(req.body.data)

    try {
        const {
            matchday, homeStartingLineup, awayStartingLineup, homeSubLineup, awaySubLineup,
            extraTime, start, end,

            main, assist, action, team, 

            motm


         }= data
        const {id, competition} = req.params

        
        console.log(data)

        const lineup = {
            starting: { home: homeStartingLineup, away: awayStartingLineup  },
            sub: { home: homeSubLineup, away: awaySubLineup }
        }







		if (!id || !competition || homeStartingLineup < 11  || awayStartingLineup < 11) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}




     
                const existing = await Fixture.findOne({_id: competition})

                    
               
            
                    if (existing) {
                        //---- Check if index exists ----
        
                            
                            const Foundmatchday = existing.fixture.findIndex(item => item.matchday == matchday);
                            const Foundmatch = existing.fixture[Foundmatchday].teams.findIndex(item => item._id == id);
                            const Foundtime = existing.fixture[Foundmatchday].teams[Foundmatch].time.now;




                            const timeline = {
                                time: Foundtime, player: { main: main, assist: assist, },
                                action: action, team: team, 
                            }





                        if (Foundmatchday == -1) {
                            
                            return  res.status(400).json({
                                type: "failed",
                                mgs: "matchday not found ",
          
                            })
                        }
        
                        if (Foundmatchday !== -1) {
                           if (Foundmatch == -1) {
                            return  res.status(400).json({
                                type: "failed",
                                mgs: "match not found ",
          
                            })  }


                            if (extraTime) {
                                existing.fixture[Foundmatchday].teams[Foundmatch].time.first + extraTime
                                existing.fixture[Foundmatchday].teams[Foundmatch].time.second + extraTime
                                existing.fixture[Foundmatchday].teams[Foundmatch].time.firstET + extraTime
                                existing.fixture[Foundmatchday].teams[Foundmatch].time.secondET + extraTime

                            }



                            if (start == "firstHalf") {
                                firstHalf(existing._id, _id, matchday)
                            }
                            else if (start == "secondhalf") {

                                secondHalf(existing._id, _id, matchday)

                            }

                            else if (start == "exratime") {
                                extraTimeFirstHalf(existing._id, _id, matchday)

                            } else if (start == "secondhalfextratime") {
                                extraTimeSecondHalf(existing._id, _id, matchday)

                            }
        
        
                        else if (Foundmatch !== -1 ) {


                            if (action && main && team ) {
                                await Fixture.findOneAndUpdate({_id: competition}, 
                                    { 
                                      "$push": {"fixture.$[day].teams.$[match]": {timeline: timeline,  }} 
                                    },
                                    { 
                                      "arrayFilters": [
                                        { "day.matchday": matchday },
                                        {"match._id": id}
    
                                      ]
                                    })   
                            } else {
                                await Fixture.findOneAndUpdate({_id: competition}, 
                                { 
                                  "$set": {"fixture.$[day].teams.$[match]": {$set: data, lineup: lineup, motm }} 
                                },
                                { 
                                  "arrayFilters": [
                                    { "day.matchday": matchday },
                                    {"match._id": id}

                                  ]
                                })   
                            }







                           }}          
             
                    }      

                        const save = await existing.save();
                       return  res.status(200).json({
                            type: "success",
                            mgs: "Process successful",
                            data: save
                        })

    }    catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "registration failed"
        })
       
   }  

})




























module.exports = router;
