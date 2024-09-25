require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const axios = require("axios");
const passport = require("passport");
const MongoDbStore = require("connect-mongo");
const session = require("express-session");
const flash = require("express-flash");
const PORT = process.env.PORT || 9000;

// Database connection

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => {
    console.error(err);
  });

// Session configuration
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  }),
);

// Passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// Assets
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());

// Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// set Template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

// Mime Types
app.get("/public/js/app.js", function (req, res) {
  res.set("Content-Type", "text/javascript");
  res.sendFile(__dirname + "/public/js/app.js");
});
app.get("/public/css/app.css", function (req, res) {
  res.set("Content-Type", "text/css");
  res.sendFile(__dirname + "/public/css/app.css");
});

app.get("/public/img/:fileName", function (req, res) {
  var fileName = req.params.fileName;
  var fileExtension = fileName.split(".").pop().toLowerCase();

  if (fileExtension === "jpg" || fileExtension === "jpeg") {
    res.set("Content-Type", "image/jpeg");
  } else if (fileExtension === "png") {
    res.set("Content-Type", "image/png");
  } else if (fileExtension === "webp") {
    res.set("Content-Type", "image/webp");
  } else if (fileExtension === "gif") {
    res.set("Content-Type", "image/gif");
  } else {
    // Return an error message if the file extension is not supported
    res.status(404).send("File not found");
  }
  res.sendFile(__dirname + "/public/img/" + fileName);
});

//Routes function call back
require("./routes/web")(app);
app.use((req, res) => {
  res.status(404).render("errors/404");
});

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`),
);
