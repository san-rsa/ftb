
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const playerSchema = new mongoose.Schema({

    name: {type: String, required: true, trim: true
    },

    picture: [{url: {type: String, required: true}, imgId: {type: String, required: true} }],

    description: {type: String, required: true
     },

     teamId: {type: mongoose.Schema.Types.String, ref: "Player", 
      },

      position: {type: String, required: true, trim: true
      },

      number: {type: Number},

    size: [{ weight: {type: Number, required: true
    },
            price: {type: Number, required: true
    }

}]
}, {
    timestamps: true
})

const Player = mongoose.model('Player', playerSchema)

module.exports = Player
