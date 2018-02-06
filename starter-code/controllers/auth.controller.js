module.exports.signup = (req, res, next) => {
  console.log("Hola")
  res.render('signup')
}

module.exports.doSignup = (req, res, next) => {
    User.findOne({ linkedinId: req.body.id })
        .then(user => {
            if (user != null) {
                res.render('auth/signup', {
                    user: user,
                    error: { username: 'Username already exists' }
                });
            } else {
                user = new User(req.body);
                user.save()
                    .then(() => {
                        req.flash('info', 'Successfully sign up, now you can login!');
                        res.redirect('/login');
                    }).catch(error => {
                        if (error instanceof mongoose.Error.ValidationError) {
                            res.render('auth/signup', {
                                user: user,
                                error: error.errors
                            });
                        } else {
                            next(error);
                        }
                    });
            }
        }).catch(error => next(error));
}

}
