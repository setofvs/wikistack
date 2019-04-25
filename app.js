const express = require('express');
const morgan = require('morgan');
// const { db } = require('./models');
// const { Page } = require('./models');
// const { User } = require('./models');
const models = require('./models');
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

// Sequelized
models.db.authenticate().then(() => {
  console.log('connected to the database');
});

const PORT = 3000;

const init = async () => {
  // why did omitting 'await' not break code
  // await models.Page.sync({ logging: false });
  // await models.User.sync({ logging: false });
  await models.db.sync({ logging: false });

  app.listen(PORT);
};

init();

// Listening

app.get('/', (req, res) => {
  res.send('');
});
