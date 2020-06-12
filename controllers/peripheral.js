const Peripheral = require('../models/peripheral')
const Gateway = require('../models/gateway')

module.exports = {
    create: async (req, res) => {
        const gatewayId = req.body.id;
        
        const peripheral = new Peripheral({
            vendor: req.body.vendor,
            status: req.body.status,
            gateway: gatewayId
        })

        peripheral.save((err, per) => {
            if(err)return res.json({error: err})
            Gateway.findById(gatewayId, (err, gateway) => {
                if(err)return res.json({error: err})
                gateway.peripheral.push(per._id)
                gateway.save(err => {
                    if(err) return res.json({error: err})
                    res.json(per)
                })
            })
        })
    }, 
    find: (req, res) => {
        Peripheral.find((err, peripherals) => {
            if(err)return res.json({error: err})
            res.json(peripherals)
        })
    },
    findByPeripheralId: (req, res) => {
        Peripheral.findById(req.params.id, (err, peripheral) => {
            if(err)return res.json({error: err})
            res.json(peripheral)
        })
    },
    findByGatewayId: (req, res) => {
        const { id } = req.params
        Peripheral.find({gateway: id}, (err, data) => {
            if(err)return res.json({error: err})
            res.json(data)
        })
    },
    remove: (req, res) => {
        Peripheral.findById(req.params.id, (err, peripheral) => {
            if(err){
                return res.json({error: err})
            }else if(!peripheral){
                return res.json({error: "Not found peripheral"})
            }
            
            const gatewayId = peripheral.gateway
            const peripheralId = peripheral._id
            
            peripheral.remove((err) => {
                if(err)return res.json({error: err})

                Gateway.findById(gatewayId, (err, gateway) => {
                    if(err)return res.json({error: err})
                    gateway.peripheral = gateway.peripheral.filter(elem => elem == peripheralId)
                    gateway.save(err => {
                        if(err)return res.json({error: err})
                        res.json(peripheral)
                    })
                })
            })
        })
    }
}