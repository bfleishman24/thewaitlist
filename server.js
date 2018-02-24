var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var PORT = 3000;
var path = require('path');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});