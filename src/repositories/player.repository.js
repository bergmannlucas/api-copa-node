const mongoose = require('mongoose');

const Player = mongoose.model('Player');

exports.get = async () => {
  const res = await Player
    .find({}, 'name shirtNumber position team')
    .populate('team', 'name stadium -_id');
  return res;
};

exports.getByName = async (name) => {
  const res = await Player
    .findOne({
      name,
    }, 'name shirtNumber position team')
    .populate('team', 'name stadium -_id');
  return res;
};

exports.getById = async (id) => {
  const res = await Player
    .findById(id, 'name shirtNumber position team')
    .populate('team', 'name stadium -_id');
  return res;
};

exports.create = async (data) => {
  const player = new Player(data);
  await player.save();
};

exports.update = async (id, data) => {
  await Player
    .findByIdAndUpdate(
      id, {
        $set: {
          name: data.name,
          shirtNumber: data.shirtNumber,
          position: data.position,
        },
      }, {
        runValidators: true,
      },
    );
};

exports.delete = async (id) => {
  await Player.findByIdAndRemove(id);
};
