const express = require('express');
const jwt = require('jsonwebtoken');

const authenticateService = require('../controllers/authenticateService');
const protectController = require('../controllers/protectController');

const router = express.Router();


router.post('/auth/register', authenticateService.register);

router.post('/auth/signin', authenticateService.signin);

router.use(protectController.protectRoute);





module.exports = router;