const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const secure = require('../middleware/secure.middleware');

router.get('/:id/edit', secure.isAuthenticated, userController.updateInterests);
router.get('/:id/news', secure.isAuthenticated, userController.showNews);
router.post('/:id', secure.isAuthenticated, userController.doUpdateInterests);
router.post('/:id/linkedin', secure.isAuthenticated, userController.shareOnLinkedIn);

module.exports = router;
