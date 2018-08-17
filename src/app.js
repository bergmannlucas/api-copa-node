'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

// Conecta ao banco
mongoose.connect('mongodb://root:lucas1@ds018308.mlab.com:18308/api-copa-node', { useNewUrlParser: true});

// Carregando os Models
const Player = require('./models/player');

// Carregando as rotas
const indexRoute = require('./routes/index.route');
const playerRoute = require('./routes/player.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/', indexRoute);
app.use('/players', playerRoute);

module.exports = app;
