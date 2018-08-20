'use strict';

const repository = require('../repositories/user.repository');

exports.create = async(req, res, next) => {
  try {
    await repository.create(req.body);
    return res.status(201).send({
      message: 'Usuário cadastrado com sucesso!'
    });
  } catch(e) {
    return res.status(500).send({
      message: 'Falha ao cadastrar usuário!'
    });
  }
}
