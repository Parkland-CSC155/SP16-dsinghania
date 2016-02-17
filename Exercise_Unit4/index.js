var process = require("process");
var fs = require("fs");
var path = require('path');

//handle the -v flag
if (process.argv.indexOf("-v") > -1) {
    //the -v flag has been included
}
//get the input folder name
if(process.argv.indexOf("-folder") >= 0) {
    
    var inputIndex = process.argv.indexOf("-folder");
    inputIndex += 1;
    var inputFile = process.argv[inputIndex];
}
//handle the file output flag
if (process.argv.indexOf("-output") > -1) {
    
    //the -v\output flag has been included
    var argIndex = process.argv.indexOf("-output");
    argIndex = argIndex + 1;
    
    //this grabs the next parameter inn out arguments array
    //e.g. -output "c:\temp\logs\file.txt"
    var outputFile = process.argv[argIndex];
   // console.log(outputFile);
}

var inputFolder = path.resolve(inputFile);
//var inputFolder = path.join(__dirname, "input") ;
//var inputFolder = path.join(__dirname, inputFile) ;
console.log(inputFolder);

var fileArray = fs.readdirSync(inputFolder);
//console.log(fileArray);

var newPath = path.join(__dirname, outputFile);
//console.log(newPath);

for(var i = 0; i < 2; i++ ){ //fileArray.length

    var fullPath = path.join(inputFolder, fileArray[i]);
    
    var contents = fs.readFileSync(fullPath);
    //console.log(contents);
    fs.appendFileSync(newPath, contents);
}

console.log("done!");

   /* function mkdirIfNotExists(path) {
         //check if directory exists
            try {
                   fs.mkdirSync(path);
            }
            catch(e) //exception object
            {
                 //test to ake sure "directory alrerady exists" error
                //eat it 
             }    
    }   */    