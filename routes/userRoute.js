const express = require('express');

const router = express.Router();


const authenticateService = require('../controllers/authenticateService');

router.post('/auth/register', authenticateService.register);

module.exports = router;