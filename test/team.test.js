const chai = require('chai');
const mongoose = require('mongoose');

const expect = chai.expect;

chai.use(require('chai-http'));

const app = require('../src/app');
const User = mongoose.model('User');
const Player = mongoose.model('Player');
const Team = mongoose.model('Team');

let token;

describe('API endpoint /teams unauthorized', () => {
  before(async () => {

  });

  after(() => {

  });

  it('GET - TEAMS', (done) => {
    chai.request(app)
      .get('/teams')
      .then(async (res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message');
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('GET - TEAMS BY NAME', (done) => {
    chai.request(app)
      .get('/teams/Teste')
      .then(async (res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message');
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('GET - TEAMS BY ID', (done) => {
    chai.request(app)
      .get('/teams/admin/5b842dd63f883a49696dca3c')
      .then(async (res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message');
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('GET - TEAM CAN PLAY', (done) => {
    chai.request(app)
      .get('/teams/teamCanPlay/5b842dd63f883a49696dca3c')
      .then(async (res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message');
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});

describe('API endpoint /teams authorized but no data', () => {
  before(async () => {
    // Cria usuario
    await chai.request(app)
      .post('/users')
      .send({
        name: 'Lucas',
        email: 'lucaasberg@gmail.com',
        password: '123',
        roles: [
          'user', 'admin',
        ],
      });

    // Autentica o usuario para gerar o token
    const res = await chai.request(app)
      .post('/users/authenticate')
      .send({
        email: 'lucaasberg@gmail.com',
        password: '123',
      });
    token = res.body.token;
  });

  after(async () => {
    await User.remove({});
    await Player.remove({});
    await Team.remove({});
  });

  it('GET - TEAMS', (done) => {
    chai.request(app)
      .get('/teams')
      .set('x-access-token', token)
      .then(async (res) => {
        expect(res).to.have.status(204);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('GET - TEAMS BY NAME', (done) => {
    chai.request(app)
      .get('/teams/Teste')
      .set('x-access-token', token)
      .then(async (res) => {
        expect(res).to.have.status(204);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('GET - TEAMS BY ID', (done) => {
    chai.request(app)
      .get('/teams/admin/5b842dd63f883a49696dca3c')
      .set('x-access-token', token)
      .then(async (res) => {
        expect(res).to.have.status(204);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('GET - TEAM CAN PLAY', (done) => {
    chai.request(app)
      .get('/teams/teamCanPlay/5b842dd63f883a49696dca3c')
      .set('x-access-token', token)
      .then(async (res) => {
        expect(res).to.have.status(204);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});
