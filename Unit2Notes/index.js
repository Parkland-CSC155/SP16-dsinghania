console.log("Hello World!");
//named functons
function someFunc(a, b, c, d) {
    //if(typeof (a) === "string")
    console.log("Hello from someFunc");
    return 1;  

}
var someFuncVar = someFunc; //points to the function
var someVar = someFunc();   //invokes the function

//anonymous function
var someAnonymousFunc = function() {
    return 2;
}

function doSomethingAsync(callback) {
    //do something asynchronously
    callback(2);
}

doSomethingAsync(function(result) {
   //now we know its done, and we have a result 

});

var me = {
    someNewFunc: function() {
        //anything
    }
    
}