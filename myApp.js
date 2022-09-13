let express = require("express");
let app = express();

/*
Use the app.get() method to serve the string "Hello Express" to GET requests matching the / (root) path.
Be sure that your code works by looking at the logs, then see the results in the preview if you are using Replit.
*/
console.log("Hello World");

//Serve a string to a GET request to root path
/* 
app.get("/", function (req, res) {
   res.send("Hello Express");
});
*/

// Serve a file to a GET request to root path
app.get("/", function (req, res) {
   res.sendFile(__dirname + "/views/index.html");
});

app.use(express.static(__dirname + "/public"));

module.exports = app;
