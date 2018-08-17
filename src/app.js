'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// Carregando as rotas
const indexRoute = require('./routes/index-route');
const playerRoute = require('./routes/player-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/player', playerRoute);

module.exports = app;