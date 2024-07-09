const express = require('express');

const organisationController = require('../controllers/organisationController');
const protectController = require('../controllers/protectController');


const router = express.Router({ mergeParams: true });

router.use(protectController.protectRoute);

router.get("/", organisationController.getAllOrganisation);

router.get("/", organisationController.getAnOrganisation);

router.post("/", organisationController.createAnOrganisation);

router.post("/", organisationController.addUserToOrganisation);


module.exports = router;