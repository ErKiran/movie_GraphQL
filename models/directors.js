const mongoose = require('mongoose');
const DirectorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    }
})

module.exports = Director = mongoose.model('directors', DirectorSchema)