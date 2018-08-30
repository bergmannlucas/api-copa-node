const chai = require('chai');

const expect = chai.expect;

chai.use(require('chai-http'));

const app = require('../src/app');

describe('API endpoint /', function () {
  this.timeout(5000);

  before(() => {

  });

  after(() => {

  });

  // GET
  it('should return OK', () => {
    return chai.request(app)
      .get('/')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });
});


// {"title":"Node Copa API","version":"0.0.1"}
