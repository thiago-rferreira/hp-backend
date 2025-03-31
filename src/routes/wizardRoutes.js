const express = require("express");
const router = express.Router();
const wizardController = require("../controllers/wizardController");

router.get("/wizards", wizardController.getAllWizards);
router.get("/wizards/:id", wizardController.getWizard);
router.post("/wizards", wizardController.createWizard);

module.exports = router;
