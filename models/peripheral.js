const mongoose = require("mongoose");

const schema = mongoose.Schema({
  vendor: String,
  status: String,
  create_at: { type: Date, default: new Date() },
  gateway :{
    type:mongoose.Schema.Types.ObjectId, ref:'Gateway'
  }
});

module.exports = mongoose.model("Peripheral", schema)