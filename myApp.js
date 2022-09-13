let express = require("express");
let app = express();
require("dotenv").config();

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

// Serve the contents of the public folder using express.static middleware
app.use("/public", express.static(__dirname + "/public"));

// Create a simple API to serve json data to a GET request
let data = { message: "Hello json" };
// Use an envirnoment variable from .env
if (process.env.MESSAGE_STYLE === "uppercase") {
   data.message = data.message.toUpperCase();
}
app.get("/json", function (req, res) {
   res.json(data);
});

module.exports = app;
