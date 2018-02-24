// Dependencies
// ===========================================================
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var PORT = 3000;
var path = require('path');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    database: '<<DATABASE>>',
    user: 'root',
    password: '',
    port: 3306,
});


connection.connect(function(err) {
    if (err) {
        throw err;
    }
    start();
});

// Body Parser Middleware
// ===========================================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Views
// ===========================================================



// Routes
// ===========================================================
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/:name?", function(req, res) {
    if (req.params.name) {
        // select where name == name
        connection.query("SELECT * FROM PUPPY_ROSTER WHERE ?", {
            name: req.params.name
        }, function(err, data) {
            if (err) {
                res.send(`Cannot find ${req.params.name}`);
                throw err;
            } else {
                if (data.length > 0) {
                    res.send(data);
                } else {
                    res.send(`Cannot find ${req.params.name}`);
                }

            }
        });
    } else {
        connection.query("SELECT * FROM PUPPY_ROSTER", function(err, data) {
            if (err) {
                res.send("Something happened!!!");
                throw err;
            }

            res.send(data);
        });
    }
});

// Listener
// ===========================================================
function start() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
}