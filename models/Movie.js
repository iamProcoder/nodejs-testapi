const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    ttile: {
        type: String,
        required: true
    },
    cotegory: String,
    country: String,
    year: Number,
    imdb: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);