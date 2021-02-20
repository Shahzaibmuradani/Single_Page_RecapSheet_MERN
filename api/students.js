const router = require("express").Router();
const db = require("../models");

router.get("/", (req, res) => {
    db.Student.find().sort('regno')
    .then((students) => res.status(200).json(students));
})

router.get("/:regno", (req, res) => {
    db.Student.find({regno: req.params.regno})
    .then((student) => res.status(200).json(student));
})


module.exports = router;