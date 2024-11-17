
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const Schema = new mongoose.Schema({

    competition: { type: mongoose.Schema.Types.String, ref: "Competition",
    },

    year : {type: Number , required: true, } ,




    fixture: [{ matchday: {type: Number, required: true},
                group: {type: String  },

        teams: [{home :{type: mongoose.Schema.Types.ObjectId, ref: "Team",   }, 
                time: { date: {type: String , required: true}, time: {type: String , required: true},},  
                away :{type: mongoose.Schema.Types.ObjectId, ref: "Team",  },
            
            
                refree: {type: String, },
                stadium: {type: String},

                lineup: {
                    home: [{type: mongoose.Schema.Types.ObjectId, ref: "Player"}],
                    away: [{type: mongoose.Schema.Types.ObjectId, ref: "Player"}]

                }

            },

              ]

}]
}, {
    timestamps: true
})

const Fixture = mongoose.model('Fixture', Schema)

module.exports = Fixture 
