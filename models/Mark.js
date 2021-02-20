const mongoose = require('mongoose');

const markSchema = mongoose.Schema({
    mid: Number,
    regno: String,
    hid: Number,
    marks: Number,
    total: Number
});

module.exports = markSchema;
module.exports = mongoose.model('Mark', markSchema);