const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);

describe("Testing enpoints", () => {
    it('Add Gateway', done => {
        chai
            .request(app)
            .post('/api/add/gateway')
            .send({"name": "gateway 6", "ip": "127.0.0.6"})
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.name).to.equals("gateway 6")
                expect(res.body.ip).to.equals("127.0.0.6")
                done()
            })
    })

    it('Get Gateways', done => {
        chai
            .request(app)
            .get('/api/gateways')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a("array")
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
})