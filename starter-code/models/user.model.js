const mongoose = require("mongoose");

const INTEREST_TYPES = require("./interest-types.js");
const FIRST_ADMIN = "Ranked Project";
const ROLE_ADMIN = "ADMIN";
const ROLE_GUEST = "GUEST";

const userSchema = new mongoose.Schema(
  {
    linkedinName: {
      type: String
      // required: [true, 'User is required']
    },
    linkedinId: {
      type: String
      // required: [true, 'LinkedinId is requiried']
    },
    interest: {
      // type: String
      // enum: [INTEREST_TYPES],
    },
    role: {
      type: String,
      enum: [ROLE_GUEST, ROLE_ADMIN],
      default: ROLE_GUEST
    }
  },
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);

userSchema.virtual("userFirstName").get(function() {
  var split = this.linkedinName.split(" ");
  return split[0];
  console.log(split);
});

const User = mongoose.model("User", userSchema);
module.exports = User;

// userSchema.pre('save', function(next) {
//   const user = this;
//
//   if (user.isAdmin()) {
//     user.role = 'ADMIN'
//   }
//   console.log('Imprimo user dentro del modelo en pre')
//   console.log(user)
//   next();
// })
//
// userSchema.methods.isAdmin = function() {
//   return this.linkedinFirstName === 'Ranked Project' || this.role === ROLE_ADMIN
// }
