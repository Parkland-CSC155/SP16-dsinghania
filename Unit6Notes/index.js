//async programming
var process = require("process");
console.log("hello world");
var fs = require("fs");

var contents = fs.readFileSync("./somefile.txt","utf8");
console.log("sync version: " + contents);

var contents2 = null;
fs.readFile("./somefile.txt","utf8", function(err, result){
    
    if(err){
        console.error(err);
        return;
    }
    contents2 = result;
    console.log("callback finished: " + contents2);    
});

console.log("immediately after the async call");

fs.mkdir("./processed", function(err1){
    if(err1){
        console.log(err1);
        return;
    }
    fs.mkdir("./processed/2014", function(err2){
        if(err2){
             console.log(err2);
             return;
        }
    });
    
    mkdirIfNotExists("./processed/2015",function(){
        console.log("2015 folder created");
    });
    
     mkdirIfNotExists("./processed/2016",function(){
        console.log("2016 folder created");
    });
    
    readAndParseJson("./Ch2015.json", function(err3, data){
        if(err3){
             console.log(err3);
        return;
        }
       console.log("received back the parsed JSON");
       console.log(data); 
    });
    
    
    
    
});
//how to make async helper function
function mkdirIfNotExists(directoryPath, callback){
    fs.mkdir(directoryPath, function(err){
        if(err){
        //we don't care if an error occurs because it probably means the directory already exists
           // console.log(err);
           // return;
        }
        //execute the callback
        callback();
    });    
}

//helper function that can have potential errors
//and a return value
function readAndParseJson(filePath, callback){
    
    fs.readFile(filePath,"utf8", function(err, result){
    
        if(err){
             console.error(err);
             
             //handback the error to whoever called us
             callback(err);
           //  return;
        }
        //result is a UTF-8 string
        var parsedObject = JSON.parse(result);
        
        //give back the parsedObject
        callback(null, parsedObject);       //first argument is for error
});
    

    
};
/* pseudo-code
function getParameter(flagName, argv) {
    //the flag has been included
    if(argv.indexOf(flagName) > -1) {
        var argIndex = argv.indexOf(flagName);
        argIndex += 1;
        var param = argv[argIndex]; 
        return param;   
    }
}

//sync
var something = getSomething();

//async
var somethingAsync = null;
function callback(result) {
    somethingAsync = result;
    console.log("callback called");
}
getSomethingAsync(callback);
 console.log("hello from async");*/