const mongoose = require('mongoose');

const FIRST_ADMIN = 'Ranked Project'
const ROLE_ADMIN = 'ADMIN'
const ROLE_GUEST = 'GUEST'

const userSchema = new mongoose.Schema({
  linkedinFirstName: {
    type: String,
    required: [true, 'User is required']
  },
  linkedinId: {
    type: String,
    required: [true, 'LinkedinId is requiried']
  },
  interests: {
    enum: ['Bitcoin', 'Javascript'],
  },
  role: {
    type: String,
    enum: [ROLE_GUEST, ROLE_ADMIN],
    default: ROLE_GUEST
  }
})

userSchema.pre('save', function(next) {
  const user = this;

  if (user.isAdmin()) {
    user.role = 'ADMIN'
  }

})

userSchema.methods.isAdmin = function() {
  return this.linkedinFirstName === 'Ranked Project' || this.role === ROLE_ADMIN
}

const User = mongoose.model('User', userSchema);
module.exports = User;
