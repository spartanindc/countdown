const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Hello World Page', function() {

//  before(function() {
//    return runServer();
//  });

//  after(function() {
//    return closeServer();
//  });

  it('should return status code 200', function() {
    return chai.request(app)
    .get('/public')
    .then(function(res) {
      expect(res).to.have.status(200);
    });
  });

  it('should be html', function(done) {
    return chai.request(app)
    .get('/public')
    .then(function(res) {
      expect(res).to.be.html;
    })
    .done();
  });
});
