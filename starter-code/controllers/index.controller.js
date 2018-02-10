module.exports.index = (req, res, next) => {
  res.render('index', {
    title: "Ranked"
  })
}

module.exports.profile = (req, res, next) => {
    res.render('profile');
}
