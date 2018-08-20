'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
const router = express.Router();

// Conecta ao banco
mongoose.connect('mongodb://root:lucas1@ds018308.mlab.com:18308/api-copa-node', { useNewUrlParser: true });

// Carregando os Models
const Player = require('./models/player');
const Team = require('./models/team');
const User = require('./models/user');

// Carregando as rotas
const indexRoute = require('./routes/index.route');
const playerRoute = require('./routes/player.route');
const teamRoute = require('./routes/team.route');
const userRoute = require('./routes/user.route');

// Middlewares
app.use(helmet());

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/', indexRoute);
app.use('/players', playerRoute);
app.use('/teams', teamRoute);
app.use('/users', userRoute);

module.exports = app;
