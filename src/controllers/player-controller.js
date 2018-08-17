'use strict';

const mongoose = require('mongoose');
const Player = mongoose.model('Player');

exports.get = (req, res, next) => {
  Player
    .find({}, 'name shirtNumber position')
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
}

exports.getByName = (req, res, next) => {
  Player
    .findOne({
      name: req.params.name
    }, 'name shirtNumber position')
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
}

exports.getById = (req, res, next) => {
  Player
    .findById(req.params.id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
}

exports.post = (req, res, next) => {
  let player = new Player(req.body);
  player
    .save()
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
  Player
    .findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        shirtNumber: req.body.shirtNumber,
        position: req.body.position
      }
    })
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
  Player
    .findOneAndRemove(req.body.id)
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
