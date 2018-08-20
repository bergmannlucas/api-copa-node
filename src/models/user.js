'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    required: true,
    default: 'user',
  }
});

module.exports = mongoose.model('User', schema);
