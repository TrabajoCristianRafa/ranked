const mongoose = require('mongoose');

const linkedinreqSchema = new mongoose.Schema({
  comment: {
    type: String,
  },
  visibility: {
    code: {
      type: String,
      default: "anyone"
    }
  }
})

const LinkedinReq = mongoose.model('LinkedinReq', linkedinreqSchema);
module.exports = LinkedinReq;
