//To use the modules we require process, filesystem, path and colors 
var process = require("process");
var fs = require('fs');
var path = require('path');
var colors = require("colors");

//Obtain the location of the logs folder from the 3rd parameter
// passed into the command line statement
var thirdParameter = process.argv[2];
//console.log(thirdParameter);  

//Creates a folder named “processed” inside the “logs” folder
fs.mkdirSync(thirdParameter + "/processed");

//Creates a folder for each year prefix
//on the log files so that the logs can be sorted by year
fs.mkdirSync(thirdParameter + "/processed/2014");
fs.mkdirSync(thirdParameter + "/processed/2015");
fs.mkdirSync(thirdParameter + "/processed/2016");

//reads the content of the directory, returns an array of filenames
var fileNew = fs.readdirSync(thirdParameter + "/raw");

//Sort the log files into the folders that match the year in their filename
for(var i = 0; i < fileNew.length; i++) {
    
    if ( fileNew[i].startsWith("2014") ) {
        fs.renameSync("logs/raw/" + fileNew[i], "logs/processed/2014/" + fileNew[i] );
    }
    else if( fileNew[i].startsWith("2015") ) {
        fs.renameSync("logs/raw/" + fileNew[i],  "logs/processed/2015/" + fileNew[i] );
    }
    else if( fileNew[i].startsWith("2016") ) {
        fs.renameSync("logs/raw/" + fileNew[i],  "logs/processed/2016/" + fileNew[i] );
    }
}

//count the total number of files that were sorted into each folder
var count2014 = fs.readdirSync("./logs/processed/2014");
var count2015 = fs.readdirSync("./logs/processed/2015");
var count2016 = fs.readdirSync("./logs/processed/2016");

//Color the log messages and write to the console the number of files in each folder
console.log(colors.green("sorting files..."));
console.log(colors.blue("moved [" + count2014.length + "] logs into processed\\2014"));
console.log(colors.blue("moved [" + count2015.length + "] logs into processed\\2015"));
console.log(colors.blue("moved [" + count2016.length + "] logs into processed\\2016"));
console.log(colors.green("...finished!"));