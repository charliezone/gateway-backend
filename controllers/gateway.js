const Gateway = require('../models/gateway')
const Peripheral = require('../models/peripheral')

module.exports = {
    create: (req, res) => {
        const gateway = new Gateway( {
            name: req.body.name,
            ip:   req.body.ip
        } )

        gateway.save((err, data) => {
            if(err)return res.json({error: err})
            res.json({success: true, data: data})
        })
    },
    find: (req, res) => {
        Gateway.find((err, data) => {
            if(err)return res.json({error: err})
            res.json({success: true, data: data})
        })
    },
    findByGatewayId: (req, res) => {
        Gateway.findById(req.params.id, (err, gateway) => {
            if(err)return res.json({error: err})
            res.json({success: true, data: gateway})
        })
    },
    remove: (req, res) => {
        Gateway.findById(req.params.id, (err, gateway) => {
            if(err){
                return res.json({error: err})
            }else if(!gateway){
                return res.json({error: "Not found peripheral"})
            }
            
            const gatewayId = gateway._id
            
            gateway.remove((err) => {
                if(err)return res.json({error: err})

                Peripheral.deleteMany({gateway: gatewayId}, err => {
                    if(err)return res.json({error: err})

                    res.json({success: true, data: gateway})
                })
            })
        })
    }
}