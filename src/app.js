const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Defining Paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup Handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "DSA"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "DSA"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "DSA",
    message: "Need Help? Call me"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }
  geocode(req.query.address, (error, { lat, lon, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(lat, lon, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        address: req.query.address,
        forecast: forecastData,
        location
      });
    });
  });
});

app.get("*", (req, res) => {
  res.send("404 not found");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
