'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/player.controller');

router.get('/', controller.get);
router.get('/:name', controller.getByName);
router.get('/admin/:id', controller.getById);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;
