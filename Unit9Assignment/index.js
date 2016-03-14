//async programming
var DEBUG = false;

console.log("starting...");
var process = require("process");
var fs = require('fs');
var path = require('path');
var colors = require("colors");

var logsFolder = path.resolve(process.argv[2]);
//console.log(process.argv);
//console.log(logsFolder);
console.log("creating [processed] directories if not exists...");

var rawFolder = path.join(logsFolder, "raw");
var processedFolder = path.join(logsFolder, "processed");

var folder2014 = path.join(processedFolder, "2014");
var folder2015 = path.join(processedFolder, "2015");
var folder2016 = path.join(processedFolder, "2016");

var numFilesRenamed = 0, numFilesMoved = 0, rawLength = 0;
var allPromises = [];
var prom1 = mkdirIfNotExistsPromise(processedFolder);  
//log("Creating processed folder");
  
prom1.then(function(result){
     var prom2 = mkdirIfNotExistsPromise(folder2014);
     //log("creating 2014 folder");
     return prom2;
})
.then(function(result){
     var prom3 = mkdirIfNotExistsPromise(folder2015);
     //log("creating 2015 folder");
     return prom3;
})
.then(function(result){
     var prom4 = mkdirIfNotExistsPromise(folder2016);
     //log("creating 2016 folder");
     return prom4;
})
.then(function(result){       
    console.log(colors.green("sorting files..."));       
    return sortFiles();    
})
.then(function(result){
    return countFiles();
})
.then(function(result){
    countFilesDone();
})
.catch(function(err){
    console.log(err);
});

//async and promise helper functions
function sortFiles(){
    
    var rawFilesArrayProm = readDirAsyncPromise(rawFolder);
    
   return rawFilesArrayProm.then(function(rawFilesArray){
        
        //log("rawFilesArray is " + rawFilesArray);
            
        rawLength = rawFilesArray.length;
        //console.log("rawLength is " + rawLength);
            
        rawFilesArray.forEach(function(file) {
            var oldPath = path.resolve(rawFolder, file);
        
            if(file.startsWith("2014")) {
                var newPath1 = path.join(folder2014, file);
                var file2014 = reNameFileAsyncPromise(oldPath, newPath1);
                allPromises.push(file2014);
            }
            if(file.startsWith("2015")) {
                var newPath2 = path.join(folder2015, file);
                var file2015 = reNameFileAsyncPromise(oldPath, newPath2);
                allPromises.push(file2015);
            }
            if(file.startsWith("2016")) {
                var newPath3 = path.join(folder2016, file);
                var file2016 = reNameFileAsyncPromise(oldPath, newPath3);
                allPromises.push(file2016);
            }
        });          
        return Promise.all(allPromises); // this signals to the rawFilesArrayProm that we're done moving files     
    });
   // return rawFilesArrayProm; // this is so the sortFiles() function can signal when it is done
}

function countFiles(){
    
    var newPromArr = [];
    
    //count the total number of files that were sorted into each folder
    var folder14ArrayProm = readDirAsyncPromise(folder2014).then(function(folder14Array){
        var count2014 = folder14Array.length;
        numFilesMoved += count2014;
        console.log(("moved [" + count2014 + "] logs into processed\\2014").cyan);
    });
    newPromArr.push(folder14ArrayProm);
       
    var folder15ArrayProm = readDirAsyncPromise(folder2015).then(function(folder15Array){
        var count2015 = folder15Array.length;
        numFilesMoved += count2015;
        console.log(("moved [" + count2015 + "] logs into processed\\2015").cyan);
    });
    newPromArr.push(folder15ArrayProm);
        
    var folder16ArrayProm = readDirAsyncPromise(folder2016).then(function(folder16Array){
        var count2016 = folder16Array.length;
        numFilesMoved += count2016;
        console.log(("moved [" + count2016 + "] logs into processed\\2016").cyan);
    });
    newPromArr.push(folder16ArrayProm);
    
    return Promise.all(newPromArr);
}

function countFilesDone(){ 
    
    if(numFilesMoved === rawLength)
        console.log("...finished!".green);
}

function reNameFileAsyncPromise(oldPath, newPath) {
    var prom = new Promise(function(resolve, reject){
        fs.rename(oldPath, newPath, function(err){
            if(err)
                reject(err);
            else {
                resolve(newPath);
            }
        });        
    });
    return prom;
} 

function readDirAsyncPromise(filePath){ 
    var prom = new Promise(function(resolve, reject){
        fs.readdir(filePath, function(err, files){    
            if(err)
                reject(err);
            else 
                resolve(files);                
        });  
    });      
    return prom;
}

function mkdirIfNotExistsPromise(directoryPath){
    var prom = new Promise(function(resolve, reject){
        fs.mkdir(directoryPath, function(err){
            if(err)
                reject(err);
            else {
                //log("directory made" + directoryPath);
                resolve(directoryPath);
            }                
        });
    });    
    return prom;
}

function log(msg) {
    if(DEBUG) {
        console.log(msg);
    }
}