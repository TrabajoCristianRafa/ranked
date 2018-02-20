const User = require("../models/user.model");
const News = require("../models/news.model");
const LinkedinReq = require("../models/linkedinreq.model");
const INTEREST_TYPES = require("../models/interest-types");
const mongoose = require("mongoose");
const sentiment = require("sentiment");
const request = require("superagent");

module.exports.updateInterests = (req, res, next) => {
  res.render("interests", {
    interestTypes: INTEREST_TYPES
  });
};

module.exports.doUpdateInterests = (req, res, next) => {
  let custom = req.body.custominterest;

  console.log(req.body);
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) {
    console.log("el usuario no tiene gustos, por favor eligelos");
  } else {
    console.log("Al usuario le gusta algo");
    User.findByIdAndUpdate(
      {
        _id: id
      },
      {
        interest: req.body.custominterest || req.body.interest
      }
    )
      .then(() => {
        console.log("user");
        res.redirect("/user/" + id + "/news");
      })
      .catch(error => {
        console.log(error);
      });
  }
};

module.exports.showNews = (req, res, next) => {
  let userInterest = req.user.interest;

  News.collection.drop();

  const Twitter = require("twitter");
  const client = new Twitter({
    consumer_key: "AoWrlLiQYrYP3PV5KGSR1lDqA",
    consumer_secret: "0mjFjAtVgRXmHKp03QxoZp88zWOY53uhGbY2FWtP6B3FXI2EWP",
    access_token_key: "962764760067473409-IKGVHHWB86pnOoMTl72WblCLwbQcOZG",
    access_token_secret: "i5v49tA4CEy99uV3Krzz47e9mYVZchXvoYGbB4OvnUsoA"
  });
  const params = {
    screen_name: userInterest
  };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      tweets = tweets.filter(tweet => {
        return (
          typeof tweet.entities.urls[0] !== "undefined" &&
          !tweet.entities.urls[0].expanded_url.includes("twitter.com")
        );
      });

      tweets.forEach(t => {
        let { score } = sentiment(t.text);
        const tweet = new News();
        let success = t.retweet_count + t.favorite_count;
        tweet.comment = t.text;
        tweet.topic = params.screen_name;
        tweet.userName = t.user.name;
        tweet.url = t.entities.urls[0].expanded_url;
        tweet.retweet = success;
        tweet.sentimentScore = score;

        tweet
          .save()
          .then(function(savedTweet) {
            if (t === tweets[tweets.length - 1]) {
              News.find({
                topic: params.screen_name
              })
                .sort({
                  retweet: 1
                })
                .limit(5)
                .then(result => {
                  res.render("news", {
                    news: result
                  });
                });
            } else {
            }
          })
          .catch(error => {
            next(error);
          });
      });
    }
  });
};

module.exports.shareOnLinkedIn = (req, res, next) => {
  console.log(req.body);
  let selectedNewsId = req.body._id;
  console.log(selectedNewsId);
  News.find({
    _id: selectedNewsId
  }).then(result => {
    var textToPost = "Hola, despues enlace: " + result[0].url;
    const linkedinreq = new LinkedinReq();
    linkedinreq.comment = textToPost;
    linkedinreq
      .save()
      .then(result => {
        let linkedinData = {
          comment: result.comment,
          visibility: result.visibility
        };
        const accessToken = res.locals.session.accessToken;
        request
          .post("https://api.linkedin.com/v1/people/~/shares?format=json")
          .send(linkedinData)
          .set("Authorization", `Bearer ${accessToken}`)
          // Header Authorization
          // http headers
          // protocolo http status codes
          // CORS
          // CSRF
          // CSP
          .set("Content-Type", "application/json")
          .set("x-li-format", "json")
          .then(linkResponse => {
            console.log("Linkedin nos dice quee..... =>");
            console.log(linkResponse.body.updateUrl);
          })
          .catch(err => {
            console.log("FALLO EN LINKEDIN =>");
            console.log(err);
          });
      })
      .catch(error => {
        next(error);
      });
  });
};
