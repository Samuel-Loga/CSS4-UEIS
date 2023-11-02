const express = require("express");
const router = express.Router();
const path = require('path');
const [authorize,admin_authorize] = require('../../middleware/authorize.js')
const {createUser,findUser, createIdentity, updateStatus} = require("../../controllers/digital_identitiesController.js");

//getting user

//creating user
router.post('/', createIdentity);

//updating user
router.post('/update',admin_authorize, updateStatus)

module.exports = router;
