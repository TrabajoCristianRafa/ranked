const User = require('../models/user.model');
const mongoose = require('mongoose');

module.exports.isAdmin = (req, res, next) => {
  console.log(req.user)
  if((typeof req.user == "undefined") || (req.user.role !== "ADMIN")){
    res.redirect('/')
  } else {
    next()
  }
}
