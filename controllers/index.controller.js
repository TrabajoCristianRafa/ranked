const mongoose = require('mongoose');
const User = require('../models/user.model');
const News = require('../models/news.model');
const LinkedinReq = require('../models/linkedinreq.model');
const INTEREST_TYPES = require('../models/interest-types');
const sentiment = require('sentiment')
const COMMENT_TYPES = require('./comments-types.js');

module.exports.index = (req, res, next) => {
  res.render('index', {
    title: "Ranked",
  })
}
