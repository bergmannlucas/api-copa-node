const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  shirtNumber: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return /^[1-9]{1}[0-9]{0,1}$/.test(v);
      },
    },
  },
  position: {
    type: String,
    required: true,
    enum: ['Goleiro', 'Lateral', 'Zagueiro', 'Volante', 'Meio-Campo', 'Atacante'],
    default: 'Goleiro',
  },
});

module.exports = mongoose.model('Player', schema);
