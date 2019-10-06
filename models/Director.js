const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 60,
        minlength: 3
    },
    surname: {
        type: String,
        required: true,
        maxlength: 60,
        minlength: 3
    },
    bio: {
        type: String,
        required: true,
        maxlength: 150,
        minlength: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('director', DirectorSchema);