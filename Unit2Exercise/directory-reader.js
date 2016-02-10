//create a local module
var fs = require("fs");
var colors = require("colors");

/*
function readDir() {
    var files = fs.readdirSync(__dirname);
    console.log(files);
}

exports.readDir = readDir;
*/
exports.readDir = function readDir() {
    var files = fs.readdirSync(__dirname);
    
    console.log(colors.green(files));
}
exports.readNewDir = function readNewDir() {
    var filesNew = fs.readdirSync("c:/");
    
    console.log(colors.yellow(filesNew));
}

