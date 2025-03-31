const express = require("express");
const router = express.Router();
const houseController = require("../controllers/houseController");

router.get("/houses", houseController.getAllHouses);
router.get("/houses/:id", houseController.getHouse);

module.exports = router;
