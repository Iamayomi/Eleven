const express = require('express');

const authenticateController = require('../controllers/authenticateController');
const protectController = require('../controllers/protectController');
const userController = require('../controllers/userController');


const router = express.Router();


router.post('/', authenticateController.register);

router.post('/', authenticateController.signin);

router.use(protectController.protectRoute);

router.get("/", userController.getAUser);


module.exports = router;