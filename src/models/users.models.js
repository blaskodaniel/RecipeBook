var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String,
    regdate: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;