const User = require('../models/user.model');
const News = require('../models/news.model');
const INTEREST_TYPES = require('../models/interest-types');
const mongoose = require('mongoose');
const sentiment = require('sentiment')

module.exports.updateInterests = (req, res, next) => {
  res.render('interests', {
    interestTypes: INTEREST_TYPES
  });
}

module.exports.doUpdateInterests = (req, res, next) =>  {
  const {
    id
  } = req.params;
  if (Object.keys(req.body).length === 0) {
    console.log("el usuario no tiene gustos, por favor eligelos")
  } else {
    console.log("Al usuario le gusta algo")
    User.findByIdAndUpdate({
        _id: id
      }, {
        interest: req.body.interest
      })
      .then(() => {
        console.log("user")
        res.redirect('/user/' + id + '/news');
      })

  }
}

module.exports.showNews = (req, res, next) => {
  let userInterest = req.user.interest
  console.log(req.user)
  console.log(req.session)

  News.collection.drop()

  const Twitter = require('twitter')
  const client = new Twitter({
    consumer_key: 'AoWrlLiQYrYP3PV5KGSR1lDqA',
    consumer_secret: '0mjFjAtVgRXmHKp03QxoZp88zWOY53uhGbY2FWtP6B3FXI2EWP',
    access_token_key: '962764760067473409-IKGVHHWB86pnOoMTl72WblCLwbQcOZG',
    access_token_secret: 'i5v49tA4CEy99uV3Krzz47e9mYVZchXvoYGbB4OvnUsoA'
  });
  const params = {
    screen_name: userInterest
  };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      tweets = tweets.filter((tweet) => {
        return (typeof tweet.entities.urls[0] !== "undefined" &&
          !tweet.entities.urls[0].expanded_url.includes("twitter.com"))
      })

      tweets.forEach((t) => {
        let {
          score
        } = sentiment(t.text);
        const tweet = new News();
        let success = t.retweet_count + t.favorite_count
        console.log(t.retweet_count)
        console.log(t.favorite_count)
        console.log(success)
        tweet.comment = t.text;
        tweet.topic = params.screen_name;
        tweet.userName = t.user.name;
        tweet.url = t.entities.urls[0].expanded_url;
        tweet.retweet = success;
        tweet.sentimentScore = score

        tweet.save()
          .then(function(savedTweet) {
            if (t === tweets[tweets.length - 1]) {
              console.log("last")

              News.find({
                topic: params.screen_name
              }).sort({
                retweet: 1
              }).limit(5)
                .then((result) => {
                  res.render("news", {
                    news: result
                  })
                });
            } else {
              console.log("noop")
            }
          })
          .catch(error => {
            next(error)
          })
      });
    }
  });
  //     News.find({
  //         topic: params.screen_name
  //       }).sort({
  //         retweet: 1
  //       }).limit(5)
  //       .then(result => {
  //         res.render('news', {
  //           news: result
  //         });
  //       })
  //   }
  // })
}

//
// module.exports.showNews = (req, res, next) => {
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
//   client.get('statuses/user_timeline', params, function(error, tweets, response) {
//     if (!error) {
//       for (i = 0; i < tweets.length; i++) {
//         if (typeof tweets[i].entities.urls[0] !== "undefined" &&
//           !tweets[i].entities.urls[0].expanded_url.includes("twitter.com")) {
//           let {
//             score
//           } = sentiment(tweets[i].text);
//           const tweet = new News();
//           tweet.comment = tweets[i].text;
//           tweet.topic = params.screen_name;
//           tweet.userName = tweets[i].user.name;
//           tweet.url = tweets[i].entities.urls[0].expanded_url;
//           tweet.retweet = tweets[i].retweet_count;
//           tweet.sentimentScore = score
//           tweet.save()
//             .then((tweet) => {
//               News.find({
//                   topic: params.screen_name
//                 }).sort({
//                   retweet: 1
//                 }).limit(5)
//                 .then(result => {
//                   console.log("ESTO ES UN ERROR")
//                   res.render('news', {
//                     news: result
//                   });
//                 })
//             })
//             .catch(error => {
//               next(error)
//             })
//         }
//       }
//     }
//   });
// }
