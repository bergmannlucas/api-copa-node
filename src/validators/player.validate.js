const Joi = require('joi');

const post = {
  body: {
    name: Joi.string().required(),
    shirtNumber: Joi.string().required(),
    position: Joi.string().required()
  }
};

const put = {
  body: {
    name: Joi.string().required(),
    shirtNumber: Joi.string().required(),
    position: Joi.string().required()
  }
};

module.exports = {
  post,
  put
};
