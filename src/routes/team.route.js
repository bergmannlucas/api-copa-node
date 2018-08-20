'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/team.controller');
const validator = require('express-validation');
const validate = require('./../validators/team.validate');

router.get('/', controller.get);
router.get('/:name', controller.getByName);
router.get('/admin/:id', controller.getById);
router.post('/', validator(validate.create), controller.create);
router.put('/:id', validator(validate.update), controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
