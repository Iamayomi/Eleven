const express = require('express');

const authenticateController = require('../controllers/authenticateController');
const protectController = require('../controllers/protectController');
const userController = require('../controllers/userController');


const router = express.Router();


router.post('/auth/register', authenticateController.register);

router.post('/auth/login', authenticateController.signin);

router.use(protectController.protectRoute);

router.get("/api/users/:userId", userController.getAUser);


module.exports = router;