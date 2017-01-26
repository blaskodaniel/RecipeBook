var mongoose = require('mongoose');

var foodSchema = mongoose.Schema({
    id: Number,
    name: String,
    category: Number,
    descripton: String,
    ingredients: [String],
    createdate: Date,
    moifydate: Date,
    createuser: String,
    modifyuser: String
});

var Recipe = mongoose.model('Recipe', foodSchema);

module.exports = Recipe;