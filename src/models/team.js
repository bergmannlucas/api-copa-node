const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  stadium: {
    type: String,
    required: true,
  },
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
});

module.exports = mongoose.model('Team', schema);
