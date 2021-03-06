const mongoose = require('mongoose');

const Team = mongoose.model('Team');

exports.get = async () => {
  const res = await Team
    .find({}, 'name stadium players')
    .populate('players', 'name shirtNumber position -_id');
  return res;
};

exports.getByName = async (name) => {
  const res = await Team
    .findOne({
      name,
    }, 'name stadium')
    .populate('players', 'name shirtNumber position -_id');
  return res;
};

exports.getById = async (id) => {
  const res = await Team
    .findById(id)
    .populate('players', 'name shirtNumber position -_id');
  return res;
};

exports.create = async (data) => {
  const team = new Team(data);
  await team.save();
};

exports.update = async (id, data) => {
  await Team
    .findByIdAndUpdate(id, {
      $set: {
        name: data.name,
        stadium: data.stadium,
        players: data.players,
      },
    });
};

exports.pushPlayers = async (id, data) => {
  await Team
    .findByIdAndUpdate(id, {
      $push: {
        players: data,
      },
    });
};

exports.delete = async (id) => {
  await Team.findByIdAndRemove(id);
};

exports.getPlayersList = async (id) => {
  const res = await Team
    .findById(id, 'players -_id')
    .populate('players', 'name shirtNumber position -_id');

  return res
    ? res.players
    : null;
};
