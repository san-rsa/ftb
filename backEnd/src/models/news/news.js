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

const News = mongoose.model("News", newsSchema);

module.exports = News