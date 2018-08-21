'use strict';

const repository = require('../repositories/player.repository');
const HTTPstatus = require('http-status');

exports.get = async (req, res, next) => {
  try {
    const data = await repository.get();
    return res.status(HTTPstatus.OK).send(data);
  } catch (e) {
    return res.status(HTTPstatus.INTERNAL_SERVER_ERROR).send({
      message: 'Falha ao processar sua requisição'
    });
  }
}

exports.getByName = async (req, res, next) => {
  try {
    const data = await repository.getByName(req.params.name);
    return res.status(HTTPstatus.OK).send(data);
  } catch (e) {
    return res.status(HTTPstatus.INTERNAL_SERVER_ERROR).send({
      message: 'Falha ao processar sua requisição'
    });
  }
}

exports.getById = async (req, res, next) => {
  try {
    const data = await repository.getById(req.params.id);
    return res.status(HTTPstatus.OK).send(data);
  } catch (e) {
    return res.status(HTTPstatus.INTERNAL_SERVER_ERROR).send({
      message: 'Falha ao processar sua requisição'
    });
  }
}

exports.create = async (req, res, next) => {
  try {
    await repository.create(req.body);
    return res.status(HTTPstatus.CREATED).send({
      message: 'Jogador cadastrado com sucesso!'
    });
  } catch (e) {
    return res.status(HTTPstatus.INTERNAL_SERVER_ERROR).send({
      message: 'Falha ao cadastrar jogador!'
    });
  }
}

exports.update = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    return res.status(HTTPstatus.OK).send({
      message: 'Jogador atualizado com sucesso!'
    });
  } catch (e) {
    return res.status(HTTPstatus.BAD_REQUEST).send({
      message: 'Falha ao atualizar jogador!',
      data: e
    });
  }
}

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.params.id);
    return res.status(HTTPstatus.OK).send({
      message: 'Jogador removido com sucesso!'
    });
  } catch (e) {
    return res.status(HTTPstatus.BAD_REQUEST).send({
      message: 'Falha ao remover jogador!',
      data: e
    });
  }
}
