var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

const Figaro = require("figaro-js");
Figaro.load();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);

async function apiCoordinates(location) {
  let response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_API_KEY}`
  );
  let json_response = await response.json();
  return json_response.results[0].geometry.location;
}

async function apiForecast(coordinates) {
  let response = await fetch(
    `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${coordinates.lat},${coordinates.lng}`
  );
  let json_response = await response.json();
  return json_response;
}

const getForecast = router.get("/", (request, response) => {
  const location = request.query.location;
  const userApiKey = request.body.api_key;

  database("users")
    .where("api_key", userApiKey)
    .then(user => {
      if (user[0]) {
        apiCoordinates(location).then(coordinates => {
          apiForecast(coordinates).then(forecast => {
            response
              .status(200)
              .send(forecast)
              .catch(error => {
                response.status(500).json({ error });
              });
          });
        });
      } else {
        return response
          .status(401)
          .json({ error: "Please supply a valid API key" });
      }
    });
});

module.exports = {
  getForecast
};
