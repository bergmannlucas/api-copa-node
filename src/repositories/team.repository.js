'use strict';

const mongoose = require('mongoose');
const Team = mongoose.model('Team');

exports.get = async () => {
  const res = await Team.find({}, 'name stadium players');
  return res;
}

exports.getByName = async (name) => {
  const res = await Team.findOne({
    name: name
  }, 'name stadium');
  return res;
}

exports.getById = async (id) => {
  const res = await Team.findById(id);
  return res;
}

exports.create = async (data) => {
  const team = new Team(data);
  await team.save();
};

exports.update = async (id, data) => {
  await Team
    .findByIdAndUpdate(id, {
      $set: {
        name: data.name,
        stadium: data.stadium
      }
    });
};

exports.delete = async (id) => {
  await Team.findByIdAndRemove(id);
};
