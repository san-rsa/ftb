
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const Schema = new mongoose.Schema({

    name: {type: String, required: true, trim: true, unique: true
    },

    type : {type: String,  enum: [ 'league', 'cup'],  },



    logo: [{url: {type: String, required: true}, imgId: {type: String, required: true} }],

    description: {type: String, },

    sub_Region: [{
        name: {type: String, }, bio: {type: String, },
        pictures: [{url: {type: String, }, imgId: {type: String, } }],

        
    }],



    views: {type: Number, default: 0 },






}, {
    timestamps: true
})

const Competition  = mongoose.model('Competition ', Schema)

module.exports = Competition  
