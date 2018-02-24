const mongoose = require('mongoose');
const News = require('../models/news.model');
const sentiment = require('sentiment')


module.exports.adminHome = (req, res, next) => {
  console.log("Hola, estoy en adminHome")
  res.render('admin')
}


// module.exports.twitterNews = (req, res, next) => {
//   const Twitter = require('twitter')
//   const client = new Twitter({
//     consumer_key: 'AoWrlLiQYrYP3PV5KGSR1lDqA',
//     consumer_secret: '0mjFjAtVgRXmHKp03QxoZp88zWOY53uhGbY2FWtP6B3FXI2EWP',
//     access_token_key: '962764760067473409-IKGVHHWB86pnOoMTl72WblCLwbQcOZG',
//     access_token_secret: 'i5v49tA4CEy99uV3Krzz47e9mYVZchXvoYGbB4OvnUsoA'
//   });
//   const params = {
//     screen_name: 'Bitcoin'
//   };
//
//   client.get('statuses/user_timeline', params, function(error, tweets, response) {
//     if (!error) {
//       for (i = 0; i < tweets.length; i++) {
//         const tweet = new News();
//         tweet.comment = tweets[i].text
//         tweet.save()
//           .then((tweet) => {
//             console.log(tweet)
//             next(null, tweet)
//           })
//           .catch(error => {
//             next(error)
//           })
//       }
//     }
//     // console.log(tweets)
//   });
// }








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
  let {
    score
  } = sentiment(req.body.comment);
  const {
    userName,
    retweet,
    url,
    comment,
    topic,
    sentimentScore
  } = req.body
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
