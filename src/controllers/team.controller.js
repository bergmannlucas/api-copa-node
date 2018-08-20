'use strict';

const repository = require('../repositories/team.repository');

exports.get = async(req, res, next) => {
  try {
    let data = await repository.get();
    res.status(200).send(data);
  } catch(e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
}

exports.getByName = async(req, res, next) => {
  try {
    let data = await repository.getByName(req.params.name);
    res.status(200).send(data);
  } catch(e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
}

exports.getById = async(req, res, next) => {
  try {
    let data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch(e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
}

exports.create = async(req, res, next) => {
  try {
    await repository.create(req.body);
    res.status(201).send({
      message: 'Time cadastrado com sucesso!'
    });
  } catch(e) {
    res.status(500).send({
      message: 'Falha ao cadastrar time!'
    });
  }
}

exports.update = async(req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({
      message: 'Time atualizado com sucesso!'
    });
  } catch(e) {
    res.status(400).send({
      message: 'Falha ao atualizar time!',
      data: e
    });
  }
}

exports.delete = async(req, res, next) => {
  try {
    await repository.delete(req.params.id);
    res.status(200).send({
      message: 'Time removido com sucesso!'
    });
  } catch(e) {
    res.status(400).send({
      message: 'Falha ao remover time!',
      data: e
    });
  }
}
