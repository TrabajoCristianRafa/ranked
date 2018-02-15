const mongoose = require('mongoose');
const News = require('../models/news.model');


module.exports.adminHome = (req, res, next) => {
  console.log("Hola, estoy en adminHome")
  res.render('admin')

}

module.exports.uploadNews = (req, res, next) => {
  const lastNews = new News();
  lastNews.userName = req.body.userName;
  lastNews.retweet = req.body.retweet;
  lastNews.url = req.body.url;
  lastNews.comment = req.body.comment;
  lastNews.topic = req.body.topic;
  lastNews.save()
    .then((news) => {
      next(null, news)
    })
    .catch(error => {
      next(error)
    })
    res.redirect('admin')
}
