const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/admin.controller');


router.get('/admin', adminControllers.adminHome);
router.post('/hola', adminControllers.uploadNews);

module.exports = router;
