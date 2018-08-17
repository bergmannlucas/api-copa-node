'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/player.controller');
const validator = require('express-validation');
const validate = require('./../validators/player.validate');

router.get('/', controller.get);
router.get('/:name', controller.getByName);
router.get('/admin/:id', controller.getById);
router.post('/', validator(validate.post), controller.post);
router.put('/:id', validator(validate.put), controller.put);
router.delete('/:id', controller.delete);

module.exports = router;
