const mongoose = require("mongoose");


const Schema = new mongoose.Schema({
  title: {type: String, required: true
  },


  body: {type: String, required: true
  },



 
}, {
    timestamps: true
}
);

const Codeofconduct = mongoose.model("Codeofconduct", Schema);

module.exports = Codeofconduct