'use strict';

const mongoose = require('mongoose');
const Player = mongoose.model('Player');

exports.get = () => {
  return Player
    .find({}, 'name shirtNumber position');
}


exports.getByName = (name) => {
  return Player.findOne({
      name: name
    }, 'name shirtNumber position');
}

exports.getById = (id) => {
  return Player.findById(id);
}

exports.create = (data) => {
  let player = new Player(data);
  return player.save();
};

exports.update = (id, data) => {
  return Player
    .findByIdAndUpdate(id, {
      $set: {
        name: data.name,
        shirtNumber: data.shirtNumber,
        position: data.position
      }
    });
};

exports.delete = (id) => {
  return Player.findByIdAndRemove(id);
};
