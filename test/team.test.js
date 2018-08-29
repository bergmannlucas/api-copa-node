const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-http'));

const app = require('../src/app');

let token;

beforeEach(async () => {
  const res = await chai.request(app)
    .post('/users/authenticate')
    .send({
      "email": "lucaasberg@gmail.com",
      "password": "123"
    });
  token = res.body.token;
});

describe('API endpoint /teams', function () {
  // GET
  it('should return OK', (done) => {
    chai.request(app)
      .get('/teams')
      .set('x-access-token', token)
      .then(async (res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      })
      .catch((e) => {
        done(e);
      });
  });

  after(() => {

  });

});
