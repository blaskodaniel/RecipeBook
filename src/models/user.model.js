var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    name: String,
    password: String
        //hash: String,
        //salt: String,
        //aktiv: Number,
        //regdate: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;