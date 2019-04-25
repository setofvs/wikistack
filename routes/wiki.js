const views = require('../views');
const express = require('express');
const { Page } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
  res.send('got to GET /wiki/');
});

router.post('/', async (req, res, next) => {
  // const slug = req.body.title.replace(/\s+/g, '_').replace(/\W/g);
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });
  try {
    // How does page have a .save method?
    await page.save();
    console.log(page);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/add', async (req, res, next) => {
  res.send(views.addPage());
});

module.exports = router;
