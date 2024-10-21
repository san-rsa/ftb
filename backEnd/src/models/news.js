const mongoose = require("mongoose");


const newsSchema = new mongoose.Schema({
  head: {type: String, required: true
  },


  body: {type: String, required: true
  },


  imgUrl: {url: {type: String, required: true}, imgId: {type: String, required: true} },

 
}, {
    timestamps: true
}
);

const Banner = mongoose.model("Banner", newsSchema);

module.exports = Banner