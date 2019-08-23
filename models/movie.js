const mongoose = require('mongoose');
const MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    director_id: {
        type: Number
    }
})

module.exports = Movies = mongoose.model('movies', MovieSchema)