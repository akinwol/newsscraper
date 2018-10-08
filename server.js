var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
const PORT = process.env.PORT || 3000;



// initialize express
var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Set handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsscrapper", { useNewUrlParser: true });

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);





app.listen(PORT, function () {
    console.log("app running")
});

module.exports = app;