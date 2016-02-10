//Hello to Node JS
/*
console.log(__dirname);
console.log(__filename);
console.log(process.argv);
console.log(process.cwd());
console.log(process.env);
console.log(process.env.APPDATA);

var fs = require("fs");

var files = fs.readdirSync(__dirname);
console.log(files);
*/

var blah = require("./directory-reader");
blah.readDir();
var newVar = require("./directory-reader");
newVar.readNewDir();



