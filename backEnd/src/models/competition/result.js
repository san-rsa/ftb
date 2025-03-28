
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const resultSchema = new mongoose.Schema({

    competition: { type: mongoose.Schema.Types.String, ref: "Competition",
    },

    year : {type: Number  , required: true, },


    type : {type: String,  enum: [ 'league', 'cup'],  },

      result: [{ matchday: {type: Number, required: true},

  
                 

        teams: [{home :{type: mongoose.Schema.Types.ObjectId, ref: "Team",  },

                homeScore: {type: Number , },  
                awayScore: {type: Number , },  

                away :{type: mongoose.Schema.Types.ObjectId, ref: "Team",  },
            
            
                
                time: { date: {type: String , required: true}, time: {type: String , required: true}}, 
                
                
                group: {type: String  },
                stage : {type: String,  enum: ['knockout', 'group'],  },

                refree: {type: String, },
                stadium: {type: String},

                lineup: {
                    starting: {
                        home: [{type: mongoose.Schema.Types.ObjectId, ref: "Player"}],
                        away: [{type: mongoose.Schema.Types.ObjectId, ref: "Player"}]
                    },

                    sub: {
                        home: [{type: mongoose.Schema.Types.ObjectId, ref: "Player"}],
                        away: [{type: mongoose.Schema.Types.ObjectId, ref: "Player"}]
                    }

                },


                motm: {type: mongoose.Schema.Types.ObjectId, ref: "Player"},

                timeline: {
                  
                        goal: {
                            home: [{time: {type: String}, player: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}],
                            away: [{time: {type: String}, player: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}]
                        },
    
                        assist: {
                            home: [{time: {type: String}, player: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}],
                            away: [{time: {type: String}, player: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}]
                        },


                        yellow: {
                            home: [{time: {type: String}, player: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}],
                            away: [{time: {type: String}, player: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}]
                        },
    
                        red: {
                            home: [{time: {type: String}, player: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}],
                            away: [{time: {type: String}, player: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}]
                        },

                        sub: {
    
                            home: [{time: {type: String}, in: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}, out: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}],
                            away: [{time: {type: String}, in: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}, out: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}]
                     
                        },


    
                },

                

          
            },

            
         ]
        }]
}, {
    timestamps: true
})

const Result = mongoose.model('Result', resultSchema)

module.exports = Result
