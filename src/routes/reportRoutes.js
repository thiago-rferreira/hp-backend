const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

// Rota para gerar CSV
router.get("/wizards/csv", reportController.exportWizardsCSV);

// Rota para gerar PDF
router.get("/wizards/pdf", reportController.exportWizardsPDF);

module.exports = router;
