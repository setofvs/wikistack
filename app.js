const express = require('express');
const morgan = require('morgan');
// const { db } = require('./models');
// const { Page } = require('./models');
// const { User } = require('./models');
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.redirect('/wiki');
});

// Sequelized
models.db.authenticate().then(() => {
  console.log('connected to the database');
});

// Listening to PORT
const PORT = 3000;

const init = async () => {
  // why did omitting 'await' not break code
  // await models.Page.sync({ logging: false });
  // await models.User.sync({ logging: false });
  await models.db.sync({ force: true }); // How is it also syncing Page & USER?

  app.listen(PORT);
};

init();
