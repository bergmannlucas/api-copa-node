const express = require('express');
const controller = require('../controllers/team.controller');
const authService = require('../services/auth.service');

const router = express.Router();

router.get('/', authService.authorize, controller.get);
router.get('/:name', authService.authorize, controller.getByName);
router.get('/admin/:id', authService.authorize, controller.getById);
router.get('/teamCanPlay/:id', authService.authorize, controller.teamCanPlay);
router.post('/', authService.isAdmin, controller.create);
router.put('/:id', authService.isAdmin, controller.update);
router.delete('/:id', authService.isAdmin, controller.delete);

module.exports = router;
