'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/player.controller');
const authService = require('../services/auth.service');

router.get('/', authService.authorize, controller.get);
router.get('/:name', authService.authorize, controller.getByName);
router.get('/admin/:id', authService.authorize, controller.getById);
router.post('/', authService.isAdmin, controller.create);
router.put('/:id', authService.isAdmin, controller.update);
router.delete('/:id', authService.isAdmin, controller.delete);

module.exports = router;
