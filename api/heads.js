const router = require("express").Router();
const db = require("../models");

router.get("/", (req,res) => {
    db.Head.find().sort('hid')
    .then((heads) => res.status(200).json(heads));
})

module.exports = router;