const express = require('express');
const router = express.Router();
const indexControllers = require('../controllers/index.controller')

router.get('/', indexControllers.index)
router.get('/auth/linkedin/profile', indexControllers.profile)
router.get('/:id/edit', indexControllers.updateInterests);
router.post('/:id', indexControllers.doUpdateInterests);


module.exports = router;
