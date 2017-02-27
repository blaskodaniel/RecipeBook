var express = require('express');
var path = require('path');
var multer = require('multer');
var fs = require('fs');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 3100));

var DIR = './uploads';

app.use(express.static(path.join(__dirname, '../data')));
app.use(express.static(path.join(__dirname, '../../uploads')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

// -----------------------------------------------------------
app.use(function(req, res, next) {
    //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testkonyv');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Models
var Recipe = require('./../models/food.model');

function MostaniIdo() {
    var d = new Date();
    var datum = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getMilliseconds();
    return datum;
}

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

        var obj = new Recipe(req.body);
        console.log("SZERVER: új recept hozzáadás: " + obj);
        obj.save(function(err, obj) {
            if (err) return console.error(err);
            res.status(200).json(obj);
        });
    });

    // find by id
    app.get('/recipe/:id', function(req, res) {
        console.log("find by id");
        Recipe.findOne({ _id: req.params.id }, function(err, obj) {
            if (err) return console.error(err);
            res.json(obj);
        })
    });

    // update by id
    app.put('/recipe/:id', function(req, res) {
        console.log("update by id");
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
        //res.sendFile(path.join(__dirname, '/../../dist/index.html'));
    });

    app.listen(app.get('port'), function() {
        console.log('Angular 2 Full Stack listening on port ' + app.get('port'));
    });
});

// ------- FILE UPLOADER ------------
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        var NAME = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
        cb(null, NAME);
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

/** API path that will upload the files */
app.post('/upload', function(req, res) {
    upload(req, res, function(err) {
        console.log(req.file);
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null, filename: req.file });
    });
});

module.exports = app;