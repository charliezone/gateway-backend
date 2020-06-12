const mongoose = require("mongoose")
const ipValidate = require('ip-validator')

const schema = mongoose.Schema({
  name: String,
  ip: {
    type: String,
    validate: [isIpV4, 'Gateway ip need to be a valid ipv4 adreess']
  },
  peripheral: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Peripheral'
      }
    ],
    validate: [peripheralLimit, 'Gateways peripherals can\'t be more than 10']
  }
});

function isIpV4(v){
  return ipValidate.ipv4(v)
}

function peripheralLimit(v){
  return v.length <= 10;
}

module.exports = mongoose.model("Gateway", schema)