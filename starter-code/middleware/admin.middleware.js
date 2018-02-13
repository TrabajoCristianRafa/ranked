const User = require('../models/user.model');
const mongoose = require('mongoose');

module.exports.isAdmin = (req, res, next) => {
  console.log(req.user)
  if(req.user.role !== "ADMIN"){
    res.redirect('/')
  } else {
    next()
  }
}
