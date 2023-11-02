const express = require("express");
const router = express.Router();
const path = require('path');
const db = require("../../controllers/dbController");

//getting user
router.get("/",(req,res) => {
    db.authenticate().then(() => console.log("Database connected..."))
    .catch(err => console.log(err.message));
});

module.exports = router;
