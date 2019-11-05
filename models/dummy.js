const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dummy = new Schema({
    key: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60,
    },
});

module.exports = mongoose.model('Dummy', Dummy);
