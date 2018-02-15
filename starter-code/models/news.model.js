const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  userName: {
    type: String,
    // required: [true, 'User is required']
  },
  retweet: {
    type: Number,
    // required: [true, 'LinkedinId is requiried']
  },
  url: {
    type: String,
  },
  sentimentScore: {
    type: Number,
  },
  topic: {
    type: String,
  },
  comment: {
    type: String,
  }
})

const News = mongoose.model('News', newsSchema);
module.exports = News;
