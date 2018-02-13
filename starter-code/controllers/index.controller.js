const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.index = (req, res, next) => {
  res.render('index', {
    title: "Ranked"
  })
}
