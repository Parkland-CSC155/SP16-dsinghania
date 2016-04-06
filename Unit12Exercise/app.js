//Intro to Web Apps
//Lets require/import the HTTP module
var http = require('http');
var path = require("path");
var fs = require("fs");
var process = require("process");

//Lets define a port we want to listen to
const PORT=process.env.port || 3000; 

//We need a function which handles requests and send response
function handleRequest(request, response){
      
    //GET: /quotes
    if(request.url.indexOf("quotes") > -1){
        
        var folder = path.join(__dirname , "data/quotes.json");
        console.log(folder);        
        
        fs.readFile(folder, "utf-8",function(err, data){
            if(err){
                console.log(err);
                return;
            } 
            //console.log(data);
            //var json = JSON.stringify(data); 
            
            response.setHeader("Content-Type", "application/json charset=UTF-8"); 
            response.end(data);
            return;
        });
    }
    else{
    var html =`
            <html>
            <head></head>
            <body>
                <p>Hello World</p>
            </body>
            </html>
        `;
    response.setHeader("Content-Type", "text/html");  
    response.end(html);
    }
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
