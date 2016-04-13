// Frame works

var express = require("express");
var path = require("path");
var app = express();

var fs = require("fs");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// basic logging
app.use(function(req, res, next){
    //console.log("REQUEST!!");    
    var log = "REQUEST URL: "+ req.url;
    console.log(log);
    next();
});

app.get("/", function(req, res, next){
    res.end("hello world");
});

app.get("/episode/:id", function(req, res){
    var id = req.params.id;
    var page = req.query.page;
    console.log(page);
    //var data = {id: id}; /*query db*/
    
    //res.render("details-example", {}); 
    //res.send(data);
});

app.get("/episodes", function(req, res){
    var folder = path.join(__dirname , "data/breaking_bad.json");
    fs.readFile(folder, "utf-8",function(err, contents){
        if(err){
            console.log(err);
            return;
        } 
        var data = JSON.parse(contents);
        //res.setHeader("Content-Type", "application/json charset=UTF-8"); 
        
        for (var i = 0 ; i <  data._embedded.episodes.length; i++){
            
            var name = data._embedded.episodes[i].name;
            var season =  data._embedded.episodes[i].season;
            var num =  data._embedded.episodes[i].number;
            var airDate =  data._embedded.episodes[i].airdate;
            res.render("index-example", {epiName: name, epiSeason: season, epiNumber: "Episode " + num, epiAirDate: airDate}); 
        }
        
        //res.end(contents);
        return;
    });
});

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