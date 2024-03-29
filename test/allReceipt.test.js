console.log('starting test');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = 'http://localhost:8080';
const expect = chai.expect;

chai.use(chaiHttp);

describe('Test to get all receipt from a user', function () {
    var requestResult;
    var response;

    before(function (done) {
        chai.request(server)
            .get('/app/user/100/receipt')
            .end(function (err, res) {
                requestResult = res.body;
                response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });

    it('The first entry in the array has known properties', function () {
        expect(requestResult[0]).to.include.keys('receiptID');
        expect(requestResult[0]).to.have.property('receiptName').that.is.a('string');
        expect(requestResult[0]).to.have.property('receiptTotalAmount').that.is.a('number');
        expect(requestResult[0]).to.have.property('date');
        expect(requestResult[0]).to.have.property('receiptUsersList').that.is.an('array');
        expect(requestResult[0]).to.have.property('receiptOwnerID').that.is.a('string');
        expect(requestResult[0]).to.have.property('receiptSplitList').that.is.an('array');
    });

    it('The elements in the array have the expected properties', function () {
        expect(requestResult).to.have.lengthOf(5);
        expect(requestResult).to.satisfy(
            function (body) {
                for (var i = 0; i < body.length; i++) {
                    expect(body[i]).to.have.property('receiptID').that.is.a('string');
                    expect(body[i]).to.have.property('receiptName').that.is.a('string');
                    expect(body[i]).to.have.property('receiptTotalAmount').that.is.a('number');
                    expect(body[i]).to.have.property('date');
                    expect(body[i]).to.have.property('receiptUsersList').that.is.an('array');
                    expect(body[i]).to.have.property('receiptOwnerID').that.is.a('string');
                    expect(body[i]).to.have.property('receiptSplitList').that.is.an('array');
                }
                return true;
            });
    });
});
