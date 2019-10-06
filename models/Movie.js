const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur..!'],
        maxlength: [20, '`{PATH}` alanı (`{VALUE}`) , ({MAXLENGTH}) karakterden küçük olmalıdır..!'],
        minlength: [2, '`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır..!']
    },
    category: {
        type: String,
        maxlength: 60,
        minlength: 3
    },
    country: {
        type: String,
        maxlength: 60,
        minlength: 3
    },
    year: {
        type: Number,
        max: 2050,
        min: 1900
    },
    imdb: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);