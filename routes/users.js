const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/login', userController.loginUser);
router.post('/auth', auth, userController.authenticateUser);

module.exports = router;
