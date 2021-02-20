const router = require("express").Router();
const db = require("../models");

router.get("/", (req, res) => {
    db.Mark.find().sort('hid')
    .then((marks) => res.status(200).json(marks));
})


router.patch("/update", (req, res) => {
    console.log(req.body);
    db.Mark.findByIdAndUpdate({_id: req.body.name},
    {
            $set : {
                marks : Number(req.body.value)
            }
    },{new: true}).then((data) => {
        res.status(200).json(data)
    })
});




router.get("/:regno", (req, res) => {

    db.Mark.find({regno: req.params.regno}).sort('hid')
    .then((marks) => res.status(200).json(marks));

/*     Promise.all([
        db.Mark.find({regno:'1712246'}).sort('hid'),
        db.Student.aggregate([
    
            { $match: {regno: "1712246"}},
            {
                $lookup: {
                    from: 'marks', 
                    localField: 'regno',
                    foreignField: 'regno', 
                    as: 'obtain' 
                }
            }, 
            {
                $unwind: '$obtain'
            }, 
            {
                $group: { _id: {regno: '$regno', name: '$name'}, total: {$sum: '$obtain.marks'}}
            }, 
            {
                $project:{
                    _id: 0,
                    regno: '$_id.regno', 
                    total: 1 
                }
            }
        ]).sort('regno')
    ]).then(([marks,total]) =>{
        res.status(200).json([marks,total]);
    });
 */    
});


module.exports = router;