const Joi = require('joi');

const create = {
  body: {
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().required()
  }
};

const update = {
  body: {
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().required()
  }
};

module.exports = {
  create,
  update
};
