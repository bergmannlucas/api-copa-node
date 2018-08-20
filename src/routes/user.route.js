'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const validator = require('express-validation');
const validate = require('./../validators/user.validate');

router.post('/', validator(validate.create), controller.create);

module.exports = router;
