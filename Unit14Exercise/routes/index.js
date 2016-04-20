
var path = require("path");
var fs = require("fs");

exports.episodes = function(req, res){
 //   var folder = path.join(__dirname , "data/breaking_bad.json");
    //var folder = path.join( "c:\\Users\\Dipty\\Desktop\\CSC155\\Unit14Exercise", "data/breaking_bad.json");
    var folder = ("./data/breaking_bad.json");

    fs.readFile(folder, "utf-8",function(err, contents){
        if(err){
            console.log(err);
            next(err);
        } 
        var data = JSON.parse(contents);
        res.render("index-example", {data: data});
        return;
    });
}

exports.id = function(req, res){
    var id = req.params.id;
    id = Number(id);            //convert string to number
    //var folder = path.join("c:\\Users\\Dipty\\Desktop\\CSC155\\Unit14Exercise", "data/breaking_bad.json");
    var folder = ("./data/breaking_bad.json");
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
}

function getEpisodesById(data, id){
    for (var i = 0 ; i <  data._embedded.episodes.length; i++){            
            if(id === data._embedded.episodes[i].id ){
                var newData = data._embedded.episodes[i];
                return newData;
            }
    }
}
