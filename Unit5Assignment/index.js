var fs = require("fs");
var path = require("path");
var process = require("process");
var log4js = require("log4js");

log4js.configure({
    appenders: [
        { type: 'file', filename: './log.txt', category: 'file-logger'}        
    ]
});

var logger = log4js.getLogger('file-logger');

//handle the -v flag
if(process.argv.indexOf("-v") > -1) {
    
    //this means -v flag has been included
    logger.setLevel("TRACE");
} else {
    logger.setLevel("INFO");
}

//get the input folder name
var inputIndex, inputFileName ;

if(process.argv.indexOf("-input") >= 0) {
    
     //the -input flag has been included
    inputIndex = process.argv.indexOf("-input");
    inputIndex += 1;
    inputFileName = process.argv[inputIndex];   
    console.log("input file is : " + inputFileName); 
}

//handle the output file flag
var outputIndex, outputFileName;

if(process.argv.indexOf("-output") >= 0) {
    
     //the -output flag has been included
   outputIndex = process.argv.indexOf("-output");
   outputIndex += 1;
   outputFileName = process.argv[outputIndex];
   console.log("the output file is : " + outputFileName);
}

var outputFolder, inputFolder, stats;
          
if (path.isAbsolute(inputFileName)) 
        inputFolder = inputFileName;
else 
        //Resolves to an absolute path
         inputFolder = path.resolve(inputFileName);
         
console.log("inputFolder is: " + inputFolder);

if(!pathExistsSync(inputFolder)) {      
        console.log("Invalid input file name");
        process.exit(1);
}

if (isAbsolute(outputFileName))
     outputFolder = outputFileName;
else 
     outputFolder = path.join(__dirname, outputFileName);
        
console.log("output folder is : " + outputFolder);

console.log("dir name of output folder is: " + path.dirname(outputFolder));    

if(!pathExistsSync(path.dirname(outputFolder))) {     
        console.log("Invalid output file name");
        process.exit(1);    
}

var inputFileArray = fs.readdirSync(inputFolder);
//console.log(inputFileArray);

var outputContent = "*** Overall Statistics ***\n";
outputContent += "CONTRACT\t|\tHIGH\t|\t\tLOW\t\t\t|\tAVERAGE SETTLE\t|\tTOTAL TRADING DAYS\n";

for(var i = 0 ; i < inputFileArray.length ; i++) {  
    var fullPath = path.join(inputFolder, inputFileArray[i]);
    
    var contents = fs.readFileSync(fullPath, "utf8");
   // console.log(contents);
    
    //deserialize it from an encoded JSON string
    var data = JSON.parse(contents);
    
    var high = data.dataset.data[0][2], low = data.dataset.data[0][3], total = 0, avg_Settle;
    var len = data.dataset.data.length;
    // console.log("len of the data array is : " + len);
   
   //log the info
   logger.info("computing stats for: " + inputFileArray[i]);
    
    for(var j = 0; j < len; j++ ) {
        
        //log the trace
        logger.trace("processing: [" +  inputFileArray[i] + "] for date: " + data.dataset.data[j][0]);
        
        //find the  highest
        if(data.dataset.data[j][2] !== null && data.dataset.data[j][2] !== 0)
            if(data.dataset.data[j][2] > high)
             high = data.dataset.data[j][2];
            
         //find the lowest
        if(data.dataset.data[j][3] !== null && data.dataset.data[j][3] !== 0)
            if(data.dataset.data[j][3] < low) 
                low = data.dataset.data[j][3];
        
        //find the total settle
        if(data.dataset.data[j][6] !== null && data.dataset.data[j][6] !== 0)
            total += data.dataset.data[j][6];         
    }
   // console.log("the total settle is : " + total);
   
    //find the average Settle 
    avg_Settle = total / len;
    
    //format output to 2 digits after decimal
    avg_Settle = avg_Settle.toFixed(2);
    high = high.toFixed(2);
    low = low.toFixed(2);
   // console.log("the avg settle is : " + avg_Settle);
    
    //output to console
    //console.log(data.dataset.dataset_code + "\t\t\t" +  high + "\t\t" + low + "\t\t\t" + avg_Settle + "\t\t\t" + len);
        
    //output contents to the destination file
    outputContent += data.dataset.dataset_code + "\t\t\t" +  high + "\t\t\t" + low +
                     "\t\t\t\t" + avg_Settle + "\t\t\t\t\t" + len + "\n";
}

fs.writeFileSync(outputFolder, outputContent);
    
console.log("done!!!");

function pathExistsSync(path){

    try {
        stats = fs.statSync(path);  // it will throw an error if the path is bad
        return true; 
    }
    catch(e){  
      return false; 
     }
     //return false; 
}  

/*
function isAbsolute(p) {
      return path.normalize(p + '/') === path.normalize(path.resolve(p) + '/');
}
  
//checks to see if the input/output file name entered is correct  
fs.accessSync(outputFolder, fs.W_OK, function(err){
    if(err) {
        console.log("Invalid output file name");
        process.exit(1);
    }
});           

fs.accessSync(inputFolder, fs.R_OK, function(err){
     if(err) {
        console.log("Invalid input file name");
        process.exit(1);
    }
}); 
*/