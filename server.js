// Dependencies
// =============================================================
const express = require("express");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const dbJSON = require("./db/db.json");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 5000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

// Routes
// =============================================================
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
