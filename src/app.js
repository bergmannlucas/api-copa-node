const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger');
const config = require('./config');

const app = express();

// Conecta ao banco
mongoose.connect(config.connectionString, { useNewUrlParser: true });

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

app.use(cors());

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use('/', indexRoute);
app.use('/players', playerRoute);
app.use('/teams', teamRoute);
app.use('/users', userRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
