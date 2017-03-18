var mongoose = require('mongoose');

var foodSchema = mongoose.Schema({
    recipename: String,
    description: String,
    ujhozzavalo: [mongoose.Schema.Types.Mixed],
    createdate: Date,
    moifydate: Date,
    category: String,
    rate: Number,
    recipecreatetime: String,
    difficultlevel: Number,
    imagefilename: String
});

var Recipe = mongoose.model('Recipe', foodSchema);

module.exports = Recipe;

/*var foodSchema = mongoose.Schema({
    id: Number,
    name: String,
    category: Number,
    descripton: String,
    ingredients: [String],
    createdate: Date,
    moifydate: Date,
    createuser: String,
    modifyuser: String
});*/