const Gateway = require('../models/gateway')

module.exports = {
    create: (req, res) => {
        const gateway = new Gateway( {
            name: req.body.name,
            ip:   req.body.ip
        } )

        gateway.save((err, data) => {
            if(err) res.json({error: err})
            res.json(data)
        })
    },
    find: (req, res) => {
        Gateway.find((err, data) => {
            if(err) res.json({error: err})
            res.json(data)
        })
    }
}