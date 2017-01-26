var express = require('express');
var path = require('path');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 3100));

app.use('/', express.static(__dirname + '/../../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testkonyv');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Models
var Recipe = require('./../models/food.model');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');

    // APIs
    // select all
    app.get('/recipe', function(req, res) {
        console.log("SZERVER: receptek lekérése");
        Recipe.find({}, function(err, docs) {
            if (err) return console.error(err);
            res.json(docs);
        });
    });

    // count all
    app.get('/recipes/count', function(req, res) {
        Recipe.count(function(err, count) {
            if (err) return console.error(err);
            res.json(count);
        });
    });

    // create
    app.post('/newrecipe', function(req, res) {
        console.log("SZERVER: új recept hozzáadás: " + req.body);
        var obj = new Recipe(req.body);
        obj.save(function(err, obj) {
            if (err) return console.error(err);
            res.status(200).json(obj);
        });
    });

    // find by id
    app.get('/recipe/:id', function(req, res) {
        Recipe.findOne({ _id: req.params.id }, function(err, obj) {
            if (err) return console.error(err);
            res.json(obj);
        })
    });

    // update by id
    app.put('/recipe/:id', function(req, res) {
        Recipe.findOneAndUpdate({ _id: req.params.id }, req.body, function(err) {
            if (err) return console.error(err);
            res.sendStatus(200);
        })
    });

    // delete by id
    app.delete('/recipe/:id', function(req, res) {
        Recipe.findOneAndRemove({ _id: req.params.id }, function(err) {
            if (err) return console.error(err);
            res.sendStatus(200);
        });
    });


    // all other routes are handled by Angular
    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '/../../dist/index.html'));
    });

    app.listen(app.get('port'), function() {
        console.log('Angular 2 Full Stack listening on port ' + app.get('port'));
    });
});

module.exports = app;