const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-http'));

const app = require('../src/app');

describe('API endpoint /', function () {
  this.timeout(5000);

  before(function () {

  });

  after(function () {

  });

  // GET
  it('should return OK', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });
});


// {"title":"Node Copa API","version":"0.0.1"}
