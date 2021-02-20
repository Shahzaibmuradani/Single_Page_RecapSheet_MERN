const db = require('./models');


 (async () =>{

//await db.Grade.find().sort('gradeid')
 
Promise.all([
    await db.Grade.find().sort('gradeid'),
    await db.Mark.find({regno:'1712246'}).sort('hid'),
    await db.Student.aggregate([

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
]).then(res =>{
        var [grades,marks,total] = res;
        console.log(JSON.stringify([grades,marks,total], null, '\t'));
        process.exit();
});
 


})(); 

