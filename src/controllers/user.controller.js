'use strict';

const repository = require('../repositories/user.repository');
const emailService = require('../services/email.service');
const md5 = require('md5');
const authService = require('../services/auth.service');

exports.create = async (req, res, next) => {
  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    });

    emailService.send(
      req.body.email,
      'Bem vindo à API da copa',
      global.EMAIL_TMPL.replace('{0}', req.body.name)
    );

    return res.status(201).send({
      message: 'Usuário cadastrado com sucesso!'
    });
  } catch (e) {
    return res.status(500).send({
      message: 'Falha ao cadastrar usuário!'
    });
  }
}

exports.authenticate = async (req, res, next) => {
  try {
    const user = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    });
    console.log(user);
    if (!user) {
      return res.status(404).send({ message: 'Usuário ou senha inválida!' });
    }

    const token = await authService.generateToken({
      email: user.email,
      name: user.name
    })

    return res.status(201).send({
      token: token,
      data: {
        email: user.email,
        name: user.name
      }
    });
  } catch (e) {
    return res.status(500).send({
      message: 'Falha ao cadastrar usuário!'
    });
  }
}
