const INTEREST_TYPES = require('../models/interest-types');

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
  console.log(req.params)
  console.log(req.body)
  let userInterests = req.body
  let userId = req.params.id
  if (Object.keys(userInterests).length === 0) {
    console.log("el usuario no tiene gustos, por favor eligelos")
  } else {
    console.log("Al usuario le gusta algo")
  }
}
