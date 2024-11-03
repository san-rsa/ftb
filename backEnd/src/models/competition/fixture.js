
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const Schema = new mongoose.Schema({

    competition: { type: mongoose.Schema.Types.String, ref: "Competition",
    },

    year : {type: Date , required: true, unique: true} ,

    fixture: [{ matchday: {type: Number, required: true},
        teams: [{home :{type: mongoose.Schema.Types.String, ref: "Team",  required: true }, 
                time: {type: Date , required: true},  
                away :{type: mongoose.Schema.Types.String, ref: "Team",  required: true }}
         ]

}]
}, {
    timestamps: true
})

const Fixture = mongoose.model('Fixture', Schema)

module.exports = Fixture 
