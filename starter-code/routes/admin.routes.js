const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/admin.controller');
const adminCheck = require('../middleware/admin.middleware');


router.get('/', adminCheck.isAdmin , adminControllers.adminHome);
router.post('/', adminCheck.isAdmin, adminControllers.uploadNews);

module.exports = router;
