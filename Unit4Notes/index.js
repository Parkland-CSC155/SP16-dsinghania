var process = require("process");
var fs = require("fs");
var path = require('path');

console.log(process.argv);

//handle the -v flag
if (process.argv.indexOf("-v") > -1) {
    //the -v flag has been included
}

//handle the file output flag
if (process.argv.indexOf("-output") > -1) {
    
    //the -v/output flag has been included
    var argIndex = process.argv.indexOf("-output");
    argIndex = argIndex + 1;
    
    //this grabs the next parameter in our arguments array
    //e.g. -output "C:\temp\logs\file.txt"
    var outputFile = process.argv[argIndex];
   // console.log(outputFile);
}


   function mkdirIfNotExists(path) {
       
         //check if directory exists
            try {
                   fs.mkdirSync(path);
            }
            catch(e) //exception object
            {
                 //test to make sure "directory already exists" error
                //eat it 
             }    
    } 

console.log("done!");
