// Welcome to Assignment 1
console.log("Hello World");
// #4a
console.log("Hello, My name is Dipty Singhania");
// #4b
console.log("This is a 'single quoted statement' and this is a \"double quoted statement\" ");
// #5a
console.log("2 plus 2 equals " + (2+2) );
// #5b
console.log("56 divided by 7 equals " + (56 / 7) );
// #5c
console.log("42.6 times 18.3 equals " + (42.6 * 18.3) );
// #5d
console.log("83.97 minus 34.86 equals " + (83.97 - 34.86) );
// #5e
console.log("49 mod 8 equals " + (49 % 8 ) );
// #6a
console.log("The answer is " + (5 + 4 + 3 / 2 * 6 - 1 ) );
// #6b
console.log("The answer is " + (4 % 3) );
// #6c
console.log("The answer is $" + (33.00 - 15.87) );
// #7a
console.log("The type of '56' is " + typeof(56) )
// #7b
console.log("The type of '43.211' is " + typeof(43.211) );
// #7c
console.log("The type of '\"2\"' is " + typeof("2") );
// #7d
console.log("The type of '\"two\"' is " + typeof("two") );
// #7e
console.log("The type of 'new Date()' is " + typeof(new Date()) );
// #7f
console.log("The type of '[]' is " + typeof([]) );
// #7g
console.log("The type of '{}' is " + typeof({}) );
// #7h
console.log("The type of 'True' is " + typeof(True) );
// #7i
console.log("The type of 'False' is " + typeof(False) );
// #7j
console.log("The type of 'Null' is " + typeof(Null) );
// #7k
console.log("The type of 'Undefined' is " + typeof(undefined) );
// #7l
console.log("The type of 'NaN' is " + typeof(NaN) );
// #7m
console.log("The type of '0' is " + typeof(0) );
// #7n
console.log("The type of '\"0\"' is " + typeof("0") );
// #7o
console.log("The type of '\"\"' is " + typeof("") );
// #7p
console.log("The type of '\"\" || 1' is " + typeof(""||1) );
// #7q
console.log("The type of '3 > 2' is " + typeof(3>2) );
// #7r
console.log("The type of '2 > 3' is " + typeof(2>3) );
// #7s
console.log("The type of 'new Number(\"some text\")' is " + typeof(new Number("some text")) );
// # 8a
var foo = 2;
var bar = 3;
// #8b
var total = foo + bar;
// #8c
total += foo * bar;
// #8d
total /= bar;
// #8e
total *= total;
// #8f
console.log("The final total is: " + total + 
        ", when the starting values are 'foo': " + foo +
        " and 'bar': " + bar);
// #9a
var car = { make: "Honda", model: "Odyssey", color: "Red" };
console.log(car);
// #9b
var house = { year: 2010, type: "TownHouse", size: "Big" };
console.log(house);
// #9c
var me = { firstName: "Dipty", lastName: "Singhania", desc: "student" };
console.log(me);
me.car = car;
me.residence = house;
console.log(me);
// #10a
var fruits = ["bananas", "apples", "oranges","kiwis", "lemons", "limes" ];
var myFruits = fruits.join("|");
console.log(myFruits);
// #10b
fruits.pop();   //removes limes
fruits.pop();   //removes lemons
fruits.shift(); //removes bananas
myFruits = fruits.join("-");
console.log(myFruits);
// #10c
fruits.shift();          //removes apples
fruits.push("apples");   //add apples to the end
fruits.push("bananas");
fruits.unshift("lemons");//add lemons to the front
fruits.unshift("limes");
myFruits = fruits.join("|");
console.log(myFruits);
// #10d
fruits = ["limes", "bananas", "apples", "oranges","kiwis", "lemons" ];
myFruits = fruits.join("-");
console.log(myFruits);
console.log("done!!");