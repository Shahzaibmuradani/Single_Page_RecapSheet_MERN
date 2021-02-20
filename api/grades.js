const router = require("express").Router();
const db = require("../models");

router.get("/", (req,res) => {
    db.Grade.find().sort('gradeid')
    .then((grades) => res.status(200).json(grades));
})

module.exports = router;