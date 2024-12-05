const Player = require("../models/competition/player");
const Stat = require("../models/competition/stats");


function win(existing, groupName, teamId, ws, ls ) {
    
    const group = existing.group.findIndex(item => item.group == String(groupName));


    const team = existing.group[group].standing.findIndex(item => item.teams == teamId);


    console.log(group, team );

    const dif = ws - ls


    existing.group[group].standing[team].stats.played = existing.group[group].standing[team].stats.played + 1;
    existing.group[group].standing[team].stats.win = existing.group[group].standing[team].stats.win + 1;
    existing.group[group].standing[team].stats.points = existing.group[group].standing[team].stats.points + 3;
    existing.group[group].standing[team].stats.gd = existing.group[group].standing[team].stats.gd + dif
    existing.group[group].standing[team].stats.gs = existing.group[group].standing[team].stats.gs + Number(ws);
    existing.group[group].standing[team].stats.ga = existing.group[group].standing[team].stats.ga + Number(ls);

    existing.group[group].standing[team].stats.form.push('W')
    


  }



  function loss(existing,groupName, teamId, ws, ls) {

    const group = existing.group.findIndex(item => item.group == groupName);

    const team = existing.group[group].standing.findIndex(item => item.teams == teamId);


    const dif = ls - ws

    existing.group[group].standing[team].stats.played = existing.group[group].standing[team].stats.played + 1;
    existing.group[group].standing[team].stats.loss = existing.group[group].standing[team].stats.loss + 1;
    existing.group[group].standing[team].stats.gd = existing.group[group].standing[team].stats.gd + dif
    existing.group[group].standing[team].stats.gs = existing.group[group].standing[team].stats.gs + Number(ls);
    existing.group[group].standing[team].stats.ga = existing.group[group].standing[team].stats.ga + Number(ws);


    existing.group[group].standing[team].stats.form.push('L')


  }






  function draw(existing, groupName,teamId, ws, ls) {

    const group = existing.group.findIndex(item => item.group == groupName);

    const team = existing.group[group].standing.findIndex(item => item.teams == teamId);


    existing.group[group].standing[team].stats.played = existing.group[group].standing[team].stats.played + 1;
    existing.group[group].standing[team].stats.draw = existing.group[group].standing[team].stats.draw + 1;
    existing.group[group].standing[team].stats.points = existing.group[group].standing[team].stats.points + 1;
    existing.group[group].standing[team].stats.gs = existing.group[group].standing[team].stats.gs + Number(ws);
    existing.group[group].standing[team].stats.ga = existing.group[group].standing[team].stats.ga + Number(ls);

    existing.group[group].standing[team].stats.form.push('D')


  }





  async function update(table, group, h, hms, aws, a) {


    
    if (hms > aws) {

      win(table, group, h, hms, aws )
      loss(table, group, a, hms, aws)
                  

    } else if (hms < aws) {
      
      win(table, group, a, aws, hms )
      loss(table, group, h, aws, hms)



    } else if (hma == aws ) {
      draw(table, group, h, hms, aws )
      draw(table, group, a, hms, aws)
    }
      
  };



async function updatePlayerPlayed(competition, year, playerId) {
  
    try {


		if (!year || !competition ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}


        const existingPlayer = await Player.findOne({_id: playerId})

        console.log(existingCompetition);
        


        const stats = {player: playerId, team: existingPlayer.teamId, 
          
          played: 1,
          goal: 0,
          assist: 0,
          yellow: 0,
          red: 0,
          motm: 0,
          potm: 0, 
      }
     
            const existing = await Stat.findOne({competition, year})
     
                    
               
            
                    if (existing) {
                        //---- Check if index exists ---- 
                            
                          const Foundplayer = existing.stats.findIndex(item => item.player == playerId);
                        
            
                        if (Foundplayer == -1) {
                            
                            existing.stats.push(stats)
                        }
        
                        if (Foundplayer !== -1) {
                         
                          existing.stats[Foundplayer].played = existing.stats[Foundplayer].played + 1;
        
                           console.log(existing, 'tt,' );
                           
        
                        }
                               
                         await existing.save()
        
        }
                     else {
            
                
                        await Stat.create({
                            competition,  year, stats
                        })

                      }
            


    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "registration failed"
        })
       
   }  




}


async function updatePlayerGoal(competition, year, playerId) {
  
  try {


  if (!year || !competition ) {
    return res.status(403).json({
      success: false,
      message: "All Fields are required",
    });
  }


      const existingPlayer = await Player.findOne({_id: playerId})

      console.log(existingCompetition);
      


      const stats = {player: playerId, team: existingPlayer.teamId, 
        
        played: 0,
        goal: 1,
        assist: 0,
        yellow: 0,
        red: 0,
        motm: 0,
        potm: 0, 
    }
   
          const existing = await Stat.findOne({competition, year})
   
                  
             
          
                  if (existing) {
                      //---- Check if index exists ---- 
                          
                        const Foundplayer = existing.stats.findIndex(item => item.player == playerId);
                      
          
                      if (Foundplayer == -1) {
                          
                          existing.stats.push(stats)
                      }
      
                      if (Foundplayer !== -1) {
                       
                        existing.stats[Foundplayer].goal = existing.stats[Foundplayer].goal + 1;
      
                         console.log(existing, 'tt,' );
                         
      
                      }
                             
                       await existing.save()
      
      }
                   else {
          
              
                      await Stat.create({
                          competition,  year, stats
                      })

                    }
          


  } catch (error) {
      console.error(error)
      return res.status(500).json({
          success: false,
          message : "registration failed"
      })
     
 }  




}


async function updatePlayerAssist(competition, year, playerId) {
  
  try {


  if (!year || !competition ) {
    return res.status(403).json({
      success: false,
      message: "All Fields are required",
    });
  }


      const existingPlayer = await Player.findOne({_id: playerId})

      console.log(existingCompetition);
      


      const stats = {player: playerId, team: existingPlayer.teamId, 
        
        played: 0,
        goal: 0,
        assist: 1,
        yellow: 0,
        red: 0,
        motm: 0,
        potm: 0, 
    }
   
          const existing = await Stat.findOne({competition, year})
   
                  
             
          
                  if (existing) {
                      //---- Check if index exists ---- 
                          
                        const Foundplayer = existing.stats.findIndex(item => item.player == playerId);
                      
          
                      if (Foundplayer == -1) {
                          
                          existing.stats.push(stats)
                      }
      
                      if (Foundplayer !== -1) {
                       
                        existing.stats[Foundplayer].assist = existing.stats[Foundplayer].assist + 1;
      
                         console.log(existing, 'tt,' );
                         
      
                      }
                             
                       await existing.save()
      
      }
                   else {
          
              
                      await Stat.create({
                          competition,  year, stats
                      })

                    }
          


  } catch (error) {
      console.error(error)
      return res.status(500).json({
          success: false,
          message : "registration failed"
      })
     
 }  




}


async function updatePlayerYellowCard(competition, year, playerId) {
  
  try {


  if (!year || !competition ) {
    return res.status(403).json({
      success: false,
      message: "All Fields are required",
    });
  }


      const existingPlayer = await Player.findOne({_id: playerId})

      console.log(existingCompetition);
      


      const stats = {player: playerId, team: existingPlayer.teamId, 
        
        played: 0,
        goal: 0,
        assist: 0,
        yellow: 1,
        red: 0,
        motm: 0,
        potm: 0, 
    }
   
          const existing = await Stat.findOne({competition, year})
   
                  
             
          
                  if (existing) {
                      //---- Check if index exists ---- 
                          
                        const Foundplayer = existing.stats.findIndex(item => item.player == playerId);
                      
          
                      if (Foundplayer == -1) {
                          
                          existing.stats.push(stats)
                      }
      
                      if (Foundplayer !== -1) {
                       
                        existing.stats[Foundplayer].yellow = existing.stats[Foundplayer].yellow + 1;
      
                         console.log(existing, 'tt,' );
                         
      
                      }
                             
                       await existing.save()
      
      }
                   else {
          
              
                      await Stat.create({
                          competition,  year, stats
                      })

                    }
          


  } catch (error) {
      console.error(error)
      return res.status(500).json({
          success: false,
          message : "registration failed"
      })
     
 }  




}


async function updatePlayerRedCard(competition, year, playerId) {
  
  try {


  if (!year || !competition ) {
    return res.status(403).json({
      success: false,
      message: "All Fields are required",
    });
  }


      const existingPlayer = await Player.findOne({_id: playerId})

      console.log(existingCompetition);
      


      const stats = {player: playerId, team: existingPlayer.teamId, 
        
        played: 0,
        goal: 0,
        assist: 0,
        yellow: 0,
        red: 1,
        motm: 0,
        potm: 0, 
    }
   
          const existing = await Stat.findOne({competition, year})
   
                  
             
          
                  if (existing) {
                      //---- Check if index exists ---- 
                          
                        const Foundplayer = existing.stats.findIndex(item => item.player == playerId);
                      
          
                      if (Foundplayer == -1) {
                          
                          existing.stats.push(stats)
                      }
      
                      if (Foundplayer !== -1) {
                       
                        existing.stats[Foundplayer].red = existing.stats[Foundplayer].red + 1;
      
                         console.log(existing, 'tt,' );
                         
      
                      }
                             
                       await existing.save()
      
      }
                   else {
          
              
                      await Stat.create({
                          competition,  year, stats
                      })

                    }
          


  } catch (error) {
      console.error(error)
      return res.status(500).json({
          success: false,
          message : "registration failed"
      })
     
 }  




}


async function updatePlayerManOfTheMatch(competition, year, playerId) {
  
  try {


  if (!year || !competition ) {
    return res.status(403).json({
      success: false,
      message: "All Fields are required",
    });
  }


      const existingPlayer = await Player.findOne({_id: playerId})

      console.log(existingCompetition);
      


      const stats = {player: playerId, team: existingPlayer.teamId, 
        
        played: 0,
        goal: 0,
        assist: 0,
        yellow: 0,
        red: 0,
        motm: 1,
        potm: 0, 
    }
   
          const existing = await Stat.findOne({competition, year})
   
                  
             
          
                  if (existing) {
                      //---- Check if index exists ---- 
                          
                        const Foundplayer = existing.stats.findIndex(item => item.player == playerId);
                      
          
                      if (Foundplayer == -1) {
                          
                          existing.stats.push(stats)
                      }
      
                      if (Foundplayer !== -1) {
                       
                        existing.stats[Foundplayer].motm = existing.stats[Foundplayer].motm + 1;
      
                         console.log(existing, 'tt,' );
                         
      
                      }
                             
                       await existing.save()
      
      }
                   else {
          
              
                      await Stat.create({
                          competition,  year, stats
                      })

                    }
          


  } catch (error) {
      console.error(error)
      return res.status(500).json({
          success: false,
          message : "registration failed"
      })
     
 }  




}


async function updatePlayerPlayerOfTheMatch(competition, year, playerId) {
  
  try {


  if (!year || !competition ) {
    return res.status(403).json({
      success: false,
      message: "All Fields are required",
    });
  }


      const existingPlayer = await Player.findOne({_id: playerId})

      console.log(existingCompetition);
      


      const stats = {player: playerId, team: existingPlayer.teamId, 
        
        played: 0,
        goal: 0,
        assist: 0,
        yellow: 0,
        red: 0,
        motm: 0,
        potm: 1, 
    }
   
          const existing = await Stat.findOne({competition, year})
   
                  
             
          
                  if (existing) {
                      //---- Check if index exists ---- 
                          
                        const Foundplayer = existing.stats.findIndex(item => item.player == playerId);
                      
          
                      if (Foundplayer == -1) {
                          
                          existing.stats.push(stats)
                      }
      
                      if (Foundplayer !== -1) {
                       
                        existing.stats[Foundplayer].potm = existing.stats[Foundplayer].potm + 1;
      
                         console.log(existing, 'tt,' );
                         
      
                      }
                             
                       await existing.save()
      
      }
                   else {
          
              
                      await Stat.create({
                          competition,  year, stats
                      })

                    }
          


  } catch (error) {
      console.error(error)
      return res.status(500).json({
          success: false,
          message : "registration failed"
      })
     
 }  




}







  module.exports = { update, updatePlayerPlayed, updatePlayerGoal, updatePlayerAssist, 
    updatePlayerYellowCard, updatePlayerRedCard, updatePlayerManOfTheMatch, updatePlayerPlayerOfTheMatch, 
  
  };