const express = require('express');

const organisationController = require('../controllers/organisationController');
const protectController = require('../controllers/protectController');


const router = express.Router({ mergeParams: true });

router.use(protectController.protectRoute);

router.get("/", organisationController.getAllOrganisation);

router.get("/:orgId", organisationController.getAnOrganisation);

router.post("/", organisationController.createAnOrganisation);

router.post("/:orgId/users", organisationController.addUserToOrganisation);


module.exports = router;