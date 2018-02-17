const mongoose = require('mongoose');
const News = require('../models/news.model');
const sentiment = require('sentiment')


module.exports.adminHome = (req, res, next) => {
  console.log("Hola, estoy en adminHome")
  res.render('admin')
}

// module.exports.updateAllNews = (req, res, next) => {
//   console.log('Entro en updateAllNews')
//   News.find()
//     .then(news => {
//       news.forEach(eachNew => {
//         let score = sentiment(eachNew.comment).score;
//         console.log(score)
//         News.findByIdAndUpdate(eachNew._id, {sentimentScore: score})
//           .then(result => {
//             console.log('He actualizado la noticia, la nueva es => ')
//             console.log(result);
//           })
//       })
//     })
// }

module.exports.uploadNews = (req, res, next) => {
  let {score} = sentiment(req.body.comment);
  const {userName, retweet, url, comment, topic, sentimentScore} = req.body
  const lastNews = new News();
  lastNews.userName = userName;
  lastNews.retweet = retweet;
  lastNews.url = url;
  lastNews.comment = comment;
  lastNews.topic = topic;
  lastNews.sentimentScore = score;
  lastNews.save()
    .then((news) => {
      console.log(lastNews.sentimentScore)
      next(null, news)
    })
    .catch(error => {
      next(error)
    })
    res.redirect('admin')
}
