const express = require("express")
const Gateway = require('./controllers/gateway')
const Peripheral = require('./controllers/peripheral')
const router = express.Router()

router.get("/gateways", Gateway.find)
router.get("/gateway/:id", Gateway.findByGatewayId)
router.post("/add/gateway", Gateway.create)
router.delete('/remove/gateway/:id', Gateway.remove)  

router.get("/peripherals", Peripheral.find)
router.get("/peripherals/:id", Peripheral.findByGatewayId)
router.get("/peripheral/:id", Peripheral.findByPeripheralId) 
router.post("/add/peripheral", Peripheral.create)
router.delete('/remove/peripheral/:id', Peripheral.remove)

module.exports = router