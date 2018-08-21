'use strict';

const repository = require('../repositories/user.repository');
const emailService = require('../services/email.service');
const md5 = require('md5');

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
