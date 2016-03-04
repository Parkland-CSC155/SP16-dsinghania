//async programming
console.log("starting...");

var process = require("process");
var fs = require('fs');
var path = require('path');
var colors = require("colors");

var logsFolder = path.resolve(process.argv[2]);

console.log("creating [processed] directories if not exists...");

var rawFolder = path.join(logsFolder, "raw");
var processedFolder = path.join(logsFolder, "processed");

var folder2014 = path.join(processedFolder, "2014");
var folder2015 = path.join(processedFolder, "2015");
var folder2016 = path.join(processedFolder, "2016");

var numFilesRenamed = 0, numFilesMoved = 0, rawLength;

mkdirIfNotExists(processedFolder, function(){  
    //console.log("processed folder created");  
      
    mkdirIfNotExists(folder2014, function(){     
        //console.log("2014 folder created");   
         
        mkdirIfNotExists(folder2015, function(){
            //console.log("2015 folder created");
            
            mkdirIfNotExists(folder2016, function(){
                 //console.log("2016 folder created");
                 
                  sortFiles();
            });  
        });               
    });
});

//async helper functions
function sortFiles(){
    readDirAsync(rawFolder, function(err1, rawFilesArray){
        if(err1){
            console.log(err1);
            return;
        }
        //console.log("rawFilesArray is " + rawFilesArray);
        console.log(colors.green("sorting files..."));
            
        rawLength = rawFilesArray.length;
        //console.log("rawLength is " + rawLength);
            
        rawFilesArray.forEach(function(file) {
            var oldPath = path.resolve(rawFolder, file);
        
            if(file.startsWith("2014")) {
                var newPath1 = path.join(folder2014, file);
                reNameFileAsync(oldPath, newPath1, rawLength, function(){
                //  console.log("2014 file moved");
                });
            }
            if(file.startsWith("2015")) {
                var newPath2 = path.join(folder2015, file);
                reNameFileAsync(oldPath, newPath2, rawLength, function(){
                    //console.log("2015 file moved");
                });
            }
            if(file.startsWith("2016")) {
                var newPath3 = path.join(folder2016, file);
                reNameFileAsync(oldPath, newPath3, rawLength, function(){
                    //console.log("2016 file moved");
                });
            }
        }); 
    });
}
function countFiles(){
    //count the total number of files that were sorted into each folder
    readDirAsync(folder2014, function(err2, folder14Array){
        if(err2){
            console.log(err2);
            return;
        }
        var count2014 = folder14Array.length;
        numFilesMoved += count2014;
        console.log(("moved [" + count2014 + "] logs into processed\\2014").cyan);
        //console.log("numFilesMoved is now: " + numFilesMoved);
        countFilesDone();
    });
       
    readDirAsync(folder2015, function(err3, folder15Array){
        if(err3){
            console.log(err3);
            return;
        }
        var count2015 = folder15Array.length;
        numFilesMoved += count2015;
        console.log(("moved [" + count2015 + "] logs into processed\\2015").cyan);
        //console.log("numFilesMoved is now: " + numFilesMoved);
        countFilesDone();
    });
        
    readDirAsync(folder2016, function(err4, folder16Array){
        if(err4){
            console.log(err4);
            return;
        }
        var count2016 = folder16Array.length;
        numFilesMoved += count2016;
        console.log(("moved [" + count2016 + "] logs into processed\\2016").cyan);
        //console.log("numFilesMoved is now: " + numFilesMoved);
        countFilesDone();
    });
}

function countFilesDone(){
    
    //console.log("numFilesMoved is: " + numFilesMoved);
    if(numFilesMoved === rawLength)
       console.log("...finished!".green);
}

function reNameFileAsync(oldPath, newPath, rawLength, callback) {
    fs.rename(oldPath, newPath, function(err){
        if(err){
            callback(err);
            console.error(err);
            return;
        }
        numFilesRenamed++;
        //console.log("numFilesRenamed inside renameFileAsync is now: " + numFilesRenamed);
        if(numFilesRenamed === rawLength)      
            countFiles();
        callback();
    });
} 

function readDirAsync(filePath, callback){    
    fs.readdir(filePath, function(err, result){    
        if(err){
            console.error(err);
            callback(err);
            return;
        }
        callback(null, result); 
    });  
}

function mkdirIfNotExists(directoryPath, callback){
    fs.mkdir(directoryPath, function(err){
        if(err){
			// this means the directory 
			// already exists
		}
        //execute the callback
        callback();
    });    
}