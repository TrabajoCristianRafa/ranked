const mongoose = require('mongoose');
const News = require('../models/news.model');


module.exports.adminHome = (req, res, next) => {
  console.log("Hola, estoy en adminHome")
  res.render('admin')

}

module.exports.uploadNews = (req, res, next) => {
  console.log("Hola, estoy en uploadNews")
  console.log(req.body)
}
