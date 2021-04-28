const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    location: String,
    reviews: String
});

module.exports = mongoose.model('User', UserSchema);