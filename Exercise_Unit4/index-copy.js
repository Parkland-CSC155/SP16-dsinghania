var process = require("path");
var fs = require("fs");

//var folderArg = process.argv[2];

console.log(process.argv);

//handle the -v flag
if (process.argv.indexOf("-v") > -1) {
    //the -v flag has been included
}

//handle the file output flag
if (process.argv.indexOf("-output") > -1) {
    //the -v\output flag has been included
    var argIndex = process.argv.indexOf("-output");
    argIndex = argIndex + 1;
    
    //this grabs the next parameter inn out arguments array
    //e.g. -output "c:\temp\logs\file.txt"
    var outputFile = process.argv[argIndex];
    console.log(outputFile);
}
function mkdirIfNotExists(path) {
    //check if directory exists
    try {
         fs.mkdirSync(path);
    }
    catch(e) //exception object
    {
        //test to ake sure "directory alrerady exists" error
         //eat it 
    }    
}

