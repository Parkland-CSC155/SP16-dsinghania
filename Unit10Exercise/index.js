// requires
var request = require("request");

var urls = [
    "https://www.quandl.com/api/v3/datasets/GOOG/NASDAQ_GOOG.json",
    "https://www.quandl.com/api/v3/datasets/GOOG/NASDAQ_MSFT.json",
    "https://www.quandl.com/api/v3/datasets/GOOG/NASDAQ_AAPL.json"
];

console.log("starting ...");

for( var i = 0; i < urls.length; i++){
    console.log("requesting URL: " + urls[i]);
    request(urls[i], function(error, response, body) {
        if(!error && response.statusCode == 200) {
            console.log("received response from URL: " + urls[i]);   
            var parsedJson = JSON.parse(body);
            console.log(parsedJson);
        }
    });
    
}
