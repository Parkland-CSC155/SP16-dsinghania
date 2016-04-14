// Frame works

var express = require("express");
var path = require("path");
var app = express();

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

app.get("/episodes", function(req, res){
    var folder = path.join(__dirname , "data/breaking_bad.json");
    fs.readFile(folder, "utf-8",function(err, contents){
        if(err){
            console.log(err);
            return;
        } 
        var data = JSON.parse(contents);
        res.render("index-example", {data: data});
        return;
    });
});

app.get("/episodes/:id", function(req, res){
    var id = req.params.id;
    id = Number(id);            //convert string to number
    res.setHeader("Content-Type", "text/html");
    var folder = path.join(__dirname , "data/breaking_bad.json");
    fs.readFile(folder, "utf-8",function(err, contents){
        if(err){
            console.log(err);
            next(err);
        } 
        var data = JSON.parse(contents);
        var newData = getEpisodesById(data, id);
        var sum = newData.summary;
        if(newData){
            res.render("details-example", {epiName: newData.name,
                epiSeason: newData.season, epiNumber: newData.number,
                epiAirDate:newData.airdate, epiSummary: newData.summary}); 
            return;
        } else {
            var err = new Error("Page Not Found!");
            err.status = 404;
            next(err);  
        }
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

function getEpisodesById(data, id){
    for (var i = 0 ; i <  data._embedded.episodes.length; i++){            
            if(id === data._embedded.episodes[i].id ){
                var newData = data._embedded.episodes[i];
                return newData;
            }
    }
}
