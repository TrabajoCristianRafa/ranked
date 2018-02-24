const router = require('express').Router();

const index = require('./index.routes');
const auth = require('./auth.routes');
const admin = require('./admin.routes');
const user = require('./user.routes');

const indexControllers = require('../controllers/index.controller');

router.use('/admin', admin);
router.use('/auth', auth);
router.use('/user', user);

router.get('/', indexControllers.index)


module.exports = router;
