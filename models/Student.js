const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    regno: String,
    name: String
});

module.exports = mongoose.model('Student', studentSchema);