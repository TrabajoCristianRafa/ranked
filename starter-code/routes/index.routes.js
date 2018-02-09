const express = require('express');
const router = express.Router();
const indexControllers = require('../controllers/index.controller')

router.get('/', indexControllers.index)
router.get('/profile', (res, req, next) => {
  res.render('profile')
})

module.exports = router;
