
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const Schema = new mongoose.Schema({

    name: {type: String, required: true, trim: true
    },

    logo: [{url: {type: String, required: true}, imgId: {type: String, required: true} }],

    description: {type: String, required: true
     },

     playerId: [{type: mongoose.Schema.Types.String, ref: "Player", 
      }],

    standing: [{ teams: {type: mongoose.Schema.Types.String, ref: "Team", 
    },
            price: {type: Number, required: true
    }

}]
}, {
    timestamps: true
})

const Standing = mongoose.model('Standing', Schema)

module.exports = Standing
