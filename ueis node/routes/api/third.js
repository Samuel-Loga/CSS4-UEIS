const express = require("express");
const router = express.Router();
const path = require('path');
const [authorize,admin_authorize] = require('../../middleware/authorize.js')
const {createThirdParty,updateStatus} = require("../../controllers/third_partiesController.js")

router.post("/add",admin_authorize,createThirdParty)

router.post("/update",admin_authorize,updateStatus)

module.exports = router;
