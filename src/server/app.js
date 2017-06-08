var express = require('express');
var path = require('path');
var multer = require('multer');
var fs = require('fs');
var morgan = require('morgan'); // logger
var crypto = require('crypto');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
app.set('port', (process.env.PORT || 3100));
var DIR = './uploads';
var hashalgorithm = 'aes-256-ctr';
var hashpassword = 'd6F3Efeq';

app.use(express.static(path.join(__dirname, '../data')));
app.use(express.static(path.join(__dirname, '/../../dist')));
app.use(express.static(path.join(__dirname, '../../uploads')));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cookieParser()); // setup cookie
app.use(morgan('dev'));

// -----------------------------------------------------------
// Set API
app.use(function(req, res, next) {
    //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    //res.header("Access-Control-Allow-Origin", "http://localhost:3100");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

// set a cookie
app.use(function(req, res, next) {
    // check if client sent cookie
    var cookie = req.cookies.recipecookie;

    if (cookie === undefined) {
        // no: set a new cookie
        var randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        //res.cookie('recipecookie', randomNumber, { expire: 360000 + Date.now(), httpOnly: true });
        console.log('Nincs cookie');
    } else {
        // yes, cookie was already present 
        console.log('cookie exists', cookie);

    }
    next();
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testkonyv');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Models
var Recipe = require('./../models/food.model');
var User = require('./../models/user.model');

function MostaniIdo() {
    var d = new Date();
    var datum = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getMilliseconds();
    return datum;
}

function encrypt(text) {
    var cipher = crypto.createCipher(hashalgorithm, hashpassword)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text) {
    var decipher = crypto.createDecipher(hashalgorithm, hashpassword)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
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
        console.log("update by id: " + req.params.id);
        console.log("body: " + req.body);
        var obj = req.body;
        delete obj._id;
        console.log(obj);
        Recipe.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true }, function(err) {
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

    // ---------------------------------------------------------
    // -------------USERS API Request-------------------------
    // ---------------------------------------------------------
    // All users list
    app.get('/users', function(req, res) {
        console.log("SZERVER: minden felhasználó lekérése - teszt");
        User.find({}, function(err, docs) {
            if (err) return console.error(err);
            res.json(docs);
        });
    });

    // find user by id
    app.post('/user', function(req, res) {
        console.log("SZERVER: felhasználó lekérése id alapján - teszt");
        User.findOne({ _id: req.body.id }, function(err, obj) {
            if (err) return console.error(err);
            res.json(obj);
        })
    });

    // login user by username and password
    app.post('/login', function(req, res) {
        var user0 = new User(req.body);
        console.log("[SZERVER]://Login: Username: " + user0.username + ", Password: " + user0.password);
        console.log("Cookie: " + req.cookies.recipecookie);
        User.findOne({ username: user0.username, password: user0.password }, function(err, obj) {
            if (err) {
                return console.error(err);
            } else {
                if (obj === null) {
                    console.log("Rossz felhasználónév vagy jelszó");
                } else {
                    console.log("Létező felhasználó");
                    var hw = encrypt(user0.username + user0.password);
                    res.cookie('recipecookie', hw, { expire: 360000 + Date.now(), httpOnly: true });
                }
                res.json(obj);
            }

        })
    });

    app.post('/getcookie', function(req, res) {
        var cookie = req.cookies.recipecookie;

        if (cookie === undefined) {
            res.json(null);
        } else {
            console.log("[SZERVER]://Getcookie: " + req.body + ", cookie: " + req.cookies.recipecookie);
            res.json(req.cookies.recipecookie);
        }

    });


    // ---------------------------------------------------------
    // -------------OTHER API Request-------------------------
    // ---------------------------------------------------------

    // all other routes are handled by Angular
    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '/../../dist/index.html'));

    });

    app.listen(app.get('port'), function(req, res) {
        console.log('Recipebook listening on port ' + app.get('port'));
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