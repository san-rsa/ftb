
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const Schema = new mongoose.Schema({

    competition: { type: mongoose.Schema.Types.String, ref: "Competition",
    },

    year : {type: Date , required: true},


     playerId: [{type: mongoose.Schema.Types.String, ref: "Player", 
      }],

    standing: [{ teams: {type: mongoose.Schema.Types.String, ref: "Team",  },
            stats: [{
                win: {type: Number, required: true, default: 0   },
                loss: {type: Number, required: true, default: 0   },
                draw: {type: Number, required: true, default: 0   },
                gd: {type: Number, required: true, default: 0   },
                point: {type: Number, required: true, default: 0   },
                play: {type: Number, required: true, default: 0   },
                

            }]

}]
}, {
    timestamps: true
})

const Standing = mongoose.model('Standing', Schema)

module.exports = Standing
