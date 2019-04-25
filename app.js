const express = require('express');
const morgan = require('morgan');
const { db } = require('./models');
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

// Sequelized
db.authenticate().then(() => {
  console.log('connected to the database');
});

// Listening
const PORT = 3000;
app.listen(PORT);

app.get('/', (req, res) => {
  res.send('');
});
