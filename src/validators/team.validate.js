const Joi = require('joi');

const create = {
  body: {
    name: Joi.string().required(),
    stadium: Joi.string().required()
  }
};

const update = {
  body: {
    name: Joi.string().required(),
    stadium: Joi.string().required()
  }
};

module.exports = {
  create,
  update
};
