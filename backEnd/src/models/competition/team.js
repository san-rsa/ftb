
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const teamSchema = new mongoose.Schema({

    name: {type: String, required: true, trim: true
    },

    logo: [{url: {type: String, required: true}, imgId: {type: String, required: true} }],

    description: {type: String, },

     playerId: [{type: mongoose.Schema.Types.String, ref: "Player", 
      }],


      fixture: [{ matchday: {type: Number, required: true},
        day: [{home :{type: mongoose.Schema.Types.String, ref: "Fixture.fixture.teams"},
               away :{type: mongoose.Schema.Types.String, ref: "Fixture.fixture.teams",   }}

  
        ]
        }],

        result: [{ matchday: {type: Number, required: true},
            day: [{home :{type: mongoose.Schema.Types.String, ref: "Fixture.fixture.teams"},
                   away :{type: mongoose.Schema.Types.String, ref: "Fixture.fixture.teams",   }}
             ]
            }]
}, {
    timestamps: true
})

const Team = mongoose.model('Team', teamSchema)

module.exports = Team
