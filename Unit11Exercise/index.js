// Querying Databases

var fs = require('fs');
var path = require('path');
var process = require('process');
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('C:/Users/Dipty/Desktop/CSC155/chinook.db');

var outputIndex, outputFolderName, outputFolder;

if(process.argv.indexOf("-output") >= 0) {
    
   outputIndex = process.argv.indexOf("-output");
   outputIndex ++;
   outputFolderName = process.argv[outputIndex];
   //console.log("the output folder name is : " + outputFolderName);
   
} else {
      console.log("please enter an output folder name");
      process.exit(1);
}

if (path.isAbsolute(outputFolderName))
    outputFolder = outputFolderName;
else 
    outputFolder = path.join(__dirname, outputFolderName);
        
//console.log("output folder is : " + outputFolder);
//console.log("dirname of output folder is : " + path.dirname(outputFolder));

pathExistsAsync(path.dirname(outputFolder), function(err, stats){
    if(err){             
      console.log(outputFolder + ": Invalid output folder name");
      process.exit(1);
    }    
});

var customerFolder = path.join(outputFolder, "customers_usa.json");
var invoiceFolder = path.join(outputFolder, "invoices_2013.json");

mkdirIfNotExists(outputFolder, function(){
    //console.log("outputFolder created");
    
    computeQuery();
});

function computeQuery(){
        
    //Find all the customers who are from the “USA”, output those to a “customers_usa.json” file.
    var customerSql = `
            SELECT * FROM customers
            WHERE Country = ?
            `;

    //Find all of the invoices created in 2013, output those to an “invoices_2013.json” file.    
    var invoiceSql = `
            SELECT * FROm invoices
            WHERE  InvoiceDate BETWEEN "2013-01-01" AND "2013-12-31"
            `;
    
    db.all(customerSql, "USA", function(cusErr, customerRows){
        if(cusErr)
            console.error(cusErr); 
            
        //console.log(customerRows);
        
        var cusRowsJson = JSON.stringify(customerRows);
        fs.writeFile(customerFolder, cusRowsJson, function(err1){            
            if(err1)
            console.log(err1);
        });
        
        db.all(invoiceSql, function(invErr, invoicesRows){
            if(invErr)
                console.error(invErr);
            
            //console.log(invoicesRows);
            
            var invRowsJson = JSON.stringify(invoicesRows);
            fs.writeFile(invoiceFolder, invRowsJson, function(err2){            
                if(err2)
                console.log(err2);
            }); 
            console.log("Done !!!");
        });   
    });
}

function mkdirIfNotExists(directoryPath, callback){
    fs.mkdir(directoryPath, function(err){
        if(err){
			// this means the directory already exists
		}
        //execute the callback
        callback();
    });    
}
function pathExistsAsync(path, callback){
    //fs.access only works on files and not directories, whereas fs.stat works on both.
            fs.stat(path, function(err, stats){    // it will throw an error if the path is bad
                if(err) {
                    //console.log(err);
                    callback(err);
                }
                callback(null, stats);
        }); 
    
}  
