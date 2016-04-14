// Frame works

var express = require("express");
var path = require("path");
var app = express();
var routes = require('./routes');
var fs = require("fs");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// basic logging
app.use(function(req, res, next){
    var log = "REQUEST URL: "+ req.url;
    console.log(log);
    next();
});

app.get("/", function(req, res, next){
    res.end("hello world");
});

app.get("/episodes", routes.episodes);
app.get("/episodes/:id", routes.id);

//create 404 errors for the urls that dont exist
app.use(function(req, res, next){
    var err = new Error("Page Not Found!");
    err.status = 404;
    next(err);                           //pass error if failure, nothing if successful
});

//handle any and all errors, catching if not caught before
app.use(function(err, req, res, next){
    res.status(err.status || 500);      //500 is catch out for all WRONG CODES    
    res.send(err.message);
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Exercise app listening on port 3000!");   
});
