const router = require("express").Router();
const db = require("../models");

router.get("/", (req,res) => {
    db.Student.aggregate([
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
    .then(marks =>{
        res.status(200).json(marks);
    });    
})


module.exports = router;