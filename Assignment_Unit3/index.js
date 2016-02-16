var process = require("process");
var thirdParameter = process.argv[2];
//console.log(thirdParameter);

var fs = require('fs');
var path = require('path');
var colors = require("colors");

var file = fs.readdirSync("./logs/raw");
//console.log(file);
//console.log(file[0]);
for(var i = 0; i < file.length; i++) {
    
    if ( file[i].startsWith("2014") ) {
       // console.log("inside if of 2014");
        fs.renameSync("logs/raw/" + file[i], "logs/processed/2014/" + file[i] );
        // path.join("logs","processed", "2014", file[i]) );
    }
    else if( file[i].startsWith("2015") ) {
        fs.renameSync("logs/raw/" + file[i],  "logs/processed/2015/" + file[i] );
        //path.join("logs","processed", "2015", file[i]) );
    }
    else if( file[i].startsWith("2016") ) {
        fs.renameSync("logs/raw/" + file[i],  "logs/processed/2016/" + file[i] );
        //path.join("logs","processed", "2016", file[i]) );
    }
}
var count2014 = fs.readdirSync("./logs/processed/2014");
var count2015 = fs.readdirSync("./logs/processed/2015");
var count2016 = fs.readdirSync("./logs/processed/2016");
console.log(colors.green("sorting files..."));
console.log(colors.blue("moved [" + count2014.length + "] logs into processed\\2014"));
console.log(colors.blue("moved [" + count2015.length + "] logs into processed\\2015"));
console.log(colors.blue("moved [" + count2016.length + "] logs into processed\\2016"));
console.log(colors.green("...finished!"));


//var fse = require('fs-extra');
//var count1 = 0, count2 = 0, count3 = 0;
//var mv = require('mv');
//mv(./logs/raw/2014*, ./logs/raw/2014/,function(err) {});
//fs.renameSync("./logs/raw/2014* ","./logs/raw/2014/");
//var fileName = ("./logs/raw/*").split(path.delimiter)[0];
//console.log(fileName);