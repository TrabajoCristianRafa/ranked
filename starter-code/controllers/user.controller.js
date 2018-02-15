const User = require('../models/user.model');
const News = require('../models/news.model');
const INTEREST_TYPES = require('../models/interest-types');
const mongoose = require('mongoose');

module.exports.updateInterests = (req, res, next) => {
  res.render('interests', {
    interestTypes: INTEREST_TYPES
  });
}

module.exports.doUpdateInterests = (req, res, next) => {
  // Object Desctructing
  const {id} = req.params;
  if (Object.keys(req.body).length === 0) {
    console.log("el usuario no tiene gustos, por favor eligelos")
  } else {
    console.log("Al usuario le gusta algo")
    User.findByIdAndUpdate({ _id: id}, {interest: req.body.interest})
      .then(() => {
        console.log("user")
        res.redirect('/user/' + id + '/news');
      })

  }
}

module.exports.showNews = function(req, res, next){
  let userInterests = req.user.interest;
  News.find({topic: userInterests}).sort({ retweet: 1 }).limit(5)
    .then(result => {
      res.render('news', {
        news: result
      }); 
    })
}
