require('dotenv').config();

global.SALT_KEY = process.env.SECRET;
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem vindo à api da copa!';

function getConnectionString() {
  return process.argv[2] === 'prod'
    ? process.env.DB_DOCKER
    : process.env.DB_LOCAL;
}

module.exports = {
  connectionString: getConnectionString(),
  sendgridKey: 'secret',
  containerConnectionString: 'TBD',
};
