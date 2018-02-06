const express = require('express');
const router = express.Router();
const indexControllers = require('../controllers/index.controller')

router.get('/', indexControllers.index)

module.exports = router;
