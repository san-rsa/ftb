
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const resultSchema = new mongoose.Schema({

    name: {type: String, required: true, trim: true
    },

    logo: [{url: {type: String, required: true}, imgId: {type: String, required: true} }],

    description: {type: String, required: true
     },

     playerId: [{type: mongoose.Schema.Types.String, ref: "Player", 
      }],


      result: [{ matchday: {type: Number, required: true},
        teams: [{home :{type: mongoose.Schema.Types.String, ref: "Team",  required: true }, 
                time: {type: String , required: true},  
                away :{type: mongoose.Schema.Types.String, ref: "Team",  required: true }}
         ]
        }]
}, {
    timestamps: true
})

const Result = mongoose.model('Result', resultSchema)

module.exports = Result
