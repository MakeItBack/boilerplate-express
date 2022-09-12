let express = require("express");
let app = express();

/*
Use the app.get() method to serve the string "Hello Express" to GET requests matching the / (root) path.
Be sure that your code works by looking at the logs, then see the results in the preview if you are using Replit.
*/

app.get("/", function (req, res) {
   res.send("Hello Express");
});
console.log("Hello World");

module.exports = app;
