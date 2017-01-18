var mongoose = require('mongoose');

var foodSchema = mongoose.Schema({
    id: Number,
    name: String,
    category: Number,
    descripton: String,
    ingredients: [String]
});

var Food = mongoose.model('Food', foodSchema);

module.exports = Food;