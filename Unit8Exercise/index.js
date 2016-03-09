//async programming
console.log("Starting...");
var DEBUG = false;

var fs = require("fs");
var path = require("path");
var process = require("process");

// handle the input file flag
var inputIndex, inputFileName, inputFolder ;

if(process.argv.indexOf("-input") >= 0) {
    
     //the -input flag has been included
    inputIndex = process.argv.indexOf("-input");
    inputIndex += 1;
    inputFileName = process.argv[inputIndex];   
    //log("the input file name is : " + inputFileName); 
} else {
    console.log("please enter an input file name");
    process.exit(1);
}

if (path.isAbsolute(inputFileName)) 
    inputFolder = inputFileName;
else 
    //Resolves to an absolute path
    inputFolder = path.resolve(inputFileName);
         
//log("inputFolder is: " + inputFolder);

if(!pathExists(inputFolder)) {      
    console.log("Invalid input file name");
    process.exit(1);
}

var ctr = 0;
var promise = readDirAsyncPromise(inputFolder);

promise.then(function(files){
    for(var i = 0 ; i < files.length ; i++) { 
        
        var fullPath = path.join(inputFolder, files[i]); 
                
        var prom3 = readAndParseJsonPromise(fullPath, files[i]);
        //console.log(prom3);
        prom3.then(function(file){
            var name = file.dataset.name;
            //log(name);
            var desc = file.dataset.description;
            //log(desc);
            console.log(name + ": " + desc);
            // log();
            ctr++;
            //log("ctr is : " + ctr); 
               
            if(ctr === files.length)
                console.log("Done!!!");   
        }); 
    }
}); 
    
function pathExists(path){
    
    //fs.accessSync only works on files and not directories, whereas fs.statSync works on both.
    try {
        fs.stat(path, function(err, stats){});  // it will throw an error if the path is bad
        return true; 
    }
    catch(e){  
      return false; 
    }
}

//helper function that can have potential errors
//and a return value
function readAndParseJsonPromise(filePath, fileName){
    var prom2 = new Promise(function(resolve, reject){
        fs.readFile(filePath,"utf8", function(err, result){
    
            if(err)
                reject(err);
             
            //result is a UTF-8 string
            var parsedObject = JSON.parse(result);
        
            //output the file name
            console.log("Reading File: " + fileName);
        
            resolve(parsedObject);
        });
    });
    
    return prom2;
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

function log(msg) {
    if(DEBUG) {
        console.log(msg);
    }
}
