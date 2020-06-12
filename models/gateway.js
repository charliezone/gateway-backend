const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  ip: String,
  peripheral: [
      {type: mongoose.Schema.Types.ObjectId, ref:'Peripheral'}
    ]
});

module.exports = mongoose.model("Gateway", schema)