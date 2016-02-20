var process = require("process");
var fs = require("fs");
var path = require('path');

//handle the -v flag
if (process.argv.indexOf("-v") > -1) {
    //the -v flag has been included
}
//get the input folder name
var inputIndex, inputFile ;
if(process.argv.indexOf("-folder") >= 0) {
     //the -input flag has been included    
    inputIndex = process.argv.indexOf("-folder");
    inputIndex += 1;
    inputFile = process.argv[inputIndex];
}
//handle the file output flag
var argIndex, outputFile;
if (process.argv.indexOf("-output") > -1) {
    
    //the -output flag has been included
    argIndex = process.argv.indexOf("-output");
    argIndex = argIndex + 1;
    
    //this grabs the next parameter inn out arguments array
    //e.g. -output "c:\temp\logs\file.txt"
    outputFile = process.argv[argIndex];
   // console.log(outputFile);
}

var inputFolder = path.resolve(inputFile);
console.log(inputFolder);

var inputFileArray = fs.readdirSync(inputFolder);
//console.log(fileArray);

var newPath = path.join(__dirname, outputFile);
//console.log(newPath);

for(var i = 0; i < inputFileArray.length; i++ ){ //

    var fullPath = path.join(inputFolder, inputFileArray[i]);
    
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