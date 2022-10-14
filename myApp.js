let express = require("express");
let bodyParser = require("body-parser");
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

// Root-Level Request Logger Middleware
app.use("/", function (req, res, next) {
   let logMsg = `${req.method} ${req.path} - ${req.ip}`;
   console.log(logMsg);
   next();
});

// Serve a file to a GET request to root path
app.get("/", function (req, res) {
   res.sendFile(__dirname + "/views/index.html");
});

// Serve the contents of the public folder using express.static middleware
app.use("/public", express.static(__dirname + "/public"));

// Use an envirnoment variable from .env
// Create a simple API to serve json data to a GET request
let message = "Hello json";
app.get("/json", function (req, res) {
   message = process.env["MESSAGE_STYLE"] === "uppercase" ? message.toUpperCase() : message;
   res.json({ message: message });
});

// Chaining middleware
app.get(
   "/now",
   function (req, res, next) {
      req.time = new Date().toString();
      next();
   },
   function (req, res) {
      res.send({ time: req.time });
   }
);

// Using ROUTE PARAMETERS such as /:userId/ to allow client/user input in the query URL
// Query parameter values provided in the query URL are stored in the req.params object
// Echo server - responds back to the user with the word they provided in the query (route) parameter
app.get("/:word/echo", (req, res) => {
   const word = req.params.word;
   res.json({ echo: word });
});

// Using QUERY STRINGS such as ?userId=124132 to allow client/user input in the query URL
// Multiple query strings can be provided at the same time by separating with an ampersand eg /library?userId=546&bookId=6754
// Query parameter values provided in the query URL are stored in the req.query object
// Some characters (like %) cannot be used in URLs so need to be encoded
app.get("/name", (req, res) => {
   const fullname = `${req.query.first} ${req.query.last}`;
   res.json({ name: fullname });
});

// Sending a POST request to send data in the body of the request
// To decode the body data coming from the post request we need to use body-parser package.
// body-parser has been added to the project in the package.json and required at top of this file
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/name", (req, res) => {
   const fullname = `${req.body.first} ${req.body.last}`;
   res.json({ name: fullname });
});

module.exports = app;
