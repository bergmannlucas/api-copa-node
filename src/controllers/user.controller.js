const HTTPstatus = require('http-status');
const md5 = require('md5');
const repository = require('../repositories/user.repository');
// const emailService = require('../services/email.service');
const authService = require('../services/auth.service');

exports.create = async (req, res) => {
  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
      roles: req.body.roles,
    });

    /*
    emailService.send(
      req.body.email,
      'Bem vindo à API da copa',
      global.EMAIL_TMPL.replace('{0}', req.body.name),
    );
    */

    return res.status(HTTPstatus.CREATED).send({
      message: 'Usuário cadastrado com sucesso!',
    });
  } catch (e) {
    return res.status(HTTPstatus.INTERNAL_SERVER_ERROR).send({
      message: 'Falha ao cadastrar usuário!',
    });
  }
};

exports.authenticate = async (req, res) => {
  try {
    const user = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
    });

    if (!user) {
      return res.status(HTTPstatus.NOT_FOUND).send({ message: 'Usuário ou senha inválida!' });
    }

    const token = await authService.generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      roles: user.roles,
    });

    return res.status(HTTPstatus.CREATED).send({
      token,
      data: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (e) {
    return res.status(HTTPstatus.INTERNAL_SERVER_ERROR).send({
      message: 'Falha ao cadastrar usuário!',
    });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    const user = await repository.getById(data.id);

    if (!user) {
      return res.status(HTTPstatus.NOT_FOUND).send({ message: 'Cliente não encontrado!' });
    }

    const tokenData = await authService.generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      roles: user.roles,
    });

    return res.status(HTTPstatus.CREATED).send({
      token: tokenData,
      data: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (e) {
    return res.status(HTTPstatus.INTERNAL_SERVER_ERROR).send({
      message: 'Falha ao cadastrar usuário!',
    });
  }
};
