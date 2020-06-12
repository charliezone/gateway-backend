const express = require("express")
const Gateway = require('./controllers/gateway')
const Peripheral = require('./controllers/peripheral')
const router = express.Router()

router.get("/gateways", Gateway.find)
router.post("/add/gateway", Gateway.create)  

router.get("/peripherals", Peripheral.find)
router.get("/peripherals/:id", Peripheral.findByGatewayId) 
router.post("/add/peripheral", Peripheral.create)
router.delete('/remove/peripheral/:id', Peripheral.remove)

module.exports = router