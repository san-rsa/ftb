
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const resultSchema = new mongoose.Schema({

    competition: { type: mongoose.Schema.Types.ObjectId, ref: "Competition",
    },

    year : {type: Date , required: true, },



      result: [{ matchday: {type: Number, required: true},
        teams: [{home :{type: mongoose.Schema.Types.ObjectId, ref: "Team",  required: true },

                homeScore: {type: Number , required: true},  
                awayScore: {type: Number , required: true},  

                away :{type: mongoose.Schema.Types.ObjectId, ref: "Team",  required: true },
            
            
                
                time: { date: {type: String , required: true}, time: {type: String , required: true}},  

          
            },

            
         ]
        }]
}, {
    timestamps: true
})

const Result = mongoose.model('Result', resultSchema)

module.exports = Result
