'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  shirtNumber: String,
  position: String
});

module.exports = mongoose.model('Player', schema);
