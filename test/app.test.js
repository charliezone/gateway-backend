const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);

describe("Testing enpoints", () => {
    let currentAddedGatewayId = null;
    let currentAddedPeripheralId = null; 

    it('Add Gateway', done => {
        chai
            .request(app)
            .post('/api/add/gateway')
            .send({"name": "gateway 6", "ip": "127.0.0.6"})
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.data.name).to.equals("gateway 6")
                expect(res.body.data.ip).to.equals("127.0.0.6")
                currentAddedGatewayId = res.body.data._id
                done()
            })
    })

    it('Return error for invalid ip to Gateway', done => {
        chai
            .request(app)
            .post('/api/add/gateway')
            .send({"name": "gateway 8", "ip": "127.0.03213.8"})
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.error.message).to.equals("Gateway validation failed: ip: Gateway ip need to be a valid ipv4 adreess")
                done()
            })
    })

    it('Get Gateways at least the test inserted one and skip the one that not pass validation', done => {
        chai
            .request(app)
            .get('/api/gateways')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.data).to.be.a("array")
                expect(res.body.data).to.have.lengthOf.at.least(1)
                done()
            })
    })

    it('Add peripheral', done => {
        chai
            .request(app)
            .post('/api/add/peripheral')
            .send({"id": `${currentAddedGatewayId}`, "vendor": "Peripheral 1", "status": "online"})
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.data.vendor).to.equals("Peripheral 1")
                expect(res.body.data.status).to.equals("online")
                currentAddedPeripheralId = res.body.data._id
                done()
            })
    })

    it('Get Peripherals at least the test inserted one', done => {
        chai
            .request(app)
            .get('/api/peripherals')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.data).to.be.a("array")
                expect(res.body.data.map(e => e._id)).to.include(currentAddedPeripheralId)
                expect(res.body.data).to.have.lengthOf.at.least(1)
                done()
            })
    })

    it('Delete previus created peripheral', done => {
        chai
            .request(app)
            .delete(`/api/remove/peripheral/${currentAddedPeripheralId}`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                expect(res.body.data._id).to.equals(currentAddedPeripheralId)
                done()
            })
    })
    

    it('Delete previus created gateway', done => {
        chai
            .request(app)
            .delete(`/api/remove/gateway/${currentAddedGatewayId}`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                expect(res.body.data._id).to.equals(currentAddedGatewayId)
                done()
            })
    })
})