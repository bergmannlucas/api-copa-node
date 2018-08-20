'use strict';

const repository = require('../repositories/player.repository');

exports.get = async(req, res, next) => {
  try {
    const data = await repository.get();
    return res.status(200).send(data);
  } catch(e) {
    return res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
}

exports.getByName = async(req, res, next) => {
  try {
    const data = await repository.getByName(req.params.name);
    return res.status(200).send(data);
  } catch(e) {
    return res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
}

exports.getById = async(req, res, next) => {
  try {
    const data = await repository.getById(req.params.id);
    return res.status(200).send(data);
  } catch(e) {
    return res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
}

exports.post = async(req, res, next) => {
  try {
    await repository.create(req.body);
    return res.status(201).send({
      message: 'Jogador cadastrado com sucesso!'
    });
  } catch(e) {
    return res.status(500).send({
      message: 'Falha ao cadastrar jogador!'
    });
  }
}

exports.put = async(req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    return res.status(200).send({
      message: 'Jogador atualizado com sucesso!'
    });
  } catch(e) {
    return res.status(400).send({
      message: 'Falha ao atualizar jogador!',
      data: e
    });
  }
}

exports.delete = async(req, res, next) => {
  try {
    await repository.delete(req.params.id);
    return res.status(200).send({
      message: 'Jogador removido com sucesso!'
    });
  } catch(e) {
    return res.status(400).send({
      message: 'Falha ao remover jogador!',
      data: e
    });
  }
}
