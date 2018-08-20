'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  stadium: String,
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }]
});

module.exports = mongoose.model('Team', schema);
