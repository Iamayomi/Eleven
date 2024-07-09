const express = require('express');

const organisationController = require('../controllers/organisationController');
const protectController = require('../controllers/protectController');


const router = express.Router({ mergeParams: true});


router.use(protectController.protectRoute);

router.get("/api/organisations", organisationController.getAllOrganisation);

router.get("/api/organisations/:orgId", organisationController.getAnOrganisation);

router.post("/api/organisations", organisationController.createAnOrganisation);

router.post("/api/organisations/:orgId/users", organisationController.addUserToOrganisation);


module.exports = router;