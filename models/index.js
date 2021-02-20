const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost/gradesheet', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = {
    Student: require('./Student'), 
    Mark: require('./Mark'),
    Head: require('./Head'), 
    Grade: require('./Grade')
}