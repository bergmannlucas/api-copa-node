const Joi = require('joi');

const create = {
  body: {
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required(),
    role: Joi.string().valid('user', 'admin').required()
  }
};

module.exports = {
  create
};
