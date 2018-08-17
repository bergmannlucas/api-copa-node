'use strict';

const mongoose = require('mongoose');
const Player = mongoose.model('Player');
const repository = require('../repositories/player.repository');

exports.get = (req, res, next) => {
  repository
  .get()
  .then(data => { res.status(200).send(data) })
  .catch(e => { res.status(400).send(e) });
}

exports.getByName = (req, res, next) => {
  repository
  .getByName(req.params.name)
  .then(data => {
    res.status(200).send(data);
  })
  .catch(e => {
    res.status(400).send(e);
  });
}

exports.getById = (req, res, next) => {
  repository
  .getById(req.params.id)
  .then(data => {
    res.status(200).send(data);
  })
  .catch(e => {
    res.status(400).send(e);
  });
}

exports.post = (req, res, next) => {
  repository
  .create(req.body)
  .then(x => {
    res.status(201).send({
      message: 'Jogador cadastrado com sucesso!'
    });
  })
  .catch(e => {
    res.status(400).send({
      message: 'Falha ao cadastrar jogador!',
      data: e
    });
  });
};

exports.put = (req, res, next) => {
  repository
  .update(req.params.id, req.body)
  .then(x => {
    res.status(200).send({
      message: 'Jogador atualizado com sucesso!'
    });
  })
  .catch(e => {
    res.status(400).send({
      message: 'Falha ao atualizar jogador!',
      data: e
    });
  });
};

exports.delete = (req, res, next) => {
  repository
  .delete(req.params.id)
  .then(x => {
    res.status(200).send({
      message: 'Jogador removido com sucesso!'
    });
  })
  .catch(e => {
    res.status(400).send({
      message: 'Falha ao remover jogador!',
      data: e
    });
  });
};
