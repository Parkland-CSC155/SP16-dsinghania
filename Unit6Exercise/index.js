//async programming
console.log("hello world");

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
    console.log("the input file name is : " + inputFileName); 
} else {
    console.log("please enter an input file name");
    process.exit(1);
}

if (path.isAbsolute(inputFileName)) 
    inputFolder = inputFileName;
else 
    //Resolves to an absolute path
    inputFolder = path.resolve(inputFileName);
         
console.log("inputFolder is: " + inputFolder);

if(!pathExists(inputFolder)) {      
    console.log("Invalid input file name");
    process.exit(1);
}
//var inputFileArray = fs.readdirSync(inputFolder);

readDirAsync(inputFolder, function(err3, inputFileArray){
        if(err3){
             console.log(err3);
        return;
        }
}); 
console.log("inputFileArray is " + inputFileArray);

for(var i = 0 ; i < inputFileArray.length ; i++) {  
    var fullPath = path.join(inputFolder, inputFileArray[i]);
    
    var contents = fs.readFile(fullPath, "utf8");
    // console.log(contents);
    
    //deserialize it from an encoded JSON string
    //var data = JSON.parse(contents);
    readAndParseJson(contents, function(err3, data){
        if(err3){
             console.log(err3);
        return;
        } 
    var name = data.datasetname;
    var desc = data.dataset.description;
    
    console.log("name is : " + name);
    console.log("description is : " + desc);
        
    });
    
   
}
console.log("Done!!!");

function pathExists(path){
 //fs.accessSync only works on files and not directories, whereas fs.statSync works on both.
    try {
        var stats = fs.stat(path);  // it will throw an error if the path is bad
        return true; 
    }
    catch(e){  
      return false; 
     }
     //return false; 
}
//helper function that can have potential errors
//and a return value
function readAndParseJson(filePath, callback){
    
    fs.readFile(filePath,"utf8", function(err, result){
    
        if(err){
             console.error(err);
             
             //handback the error to whoever called us
             callback(err);
             return;
        }
        //result is a UTF-8 string
        var parsedObject = JSON.parse(result);
        
        //give back the parsedObject
        callback(null, parsedObject);       //first argument is for error
});
}
readDirAsync(filePath, callback){
   fs.readdir(filePath, function(err, result){
    
    if(err){
        console.error(err);
        callback(err);
        return;
    }
    //contents2 = result;
    //console.log("callback finished: " + contents2);    
});
    //callback(null,arr);
}
