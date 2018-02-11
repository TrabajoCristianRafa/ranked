const INTEREST_TYPES = require('../models/interest-types');
const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.index = (req, res, next) => {
  res.render('index', {
    title: "Ranked"
  })
}

module.exports.profile = (req, res, next) => {
  res.render('profile');

}

module.exports.updateInterests = (req, res, next) => {
  res.render('interests', {
    interestTypes: INTEREST_TYPES
  });
}

module.exports.doUpdateInterests = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    console.log("el usuario no tiene gustos, por favor eligelos")
    // Añadir un campo para resaltar que elija un interés
  } else {
    console.log("Al usuario le gusta algo")
    User.findByIdAndUpdate({ _id: req.params.id}, {interest: req.body.interest})
      .then(() => {
        console.log("user")
        res.redirect('/' + req.params.id + '/news')
      })

  }
}


module.exports.showNews = (req, res, next) => {
  res.render('news');
}
