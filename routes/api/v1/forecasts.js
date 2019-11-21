var express = require("express");
var router = express.Router();

var apiHelper = require("../../../helpers/api_helper");
var formatHelper = require("../../../helpers/format_helper")

const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);

const getForecast = router.get("/", (request, response) => {
  const location = request.query.location;
  const userApiKey = request.body.api_key;

  database("users").where("api_key", userApiKey)
    .then(user => {
      if (user[0]) {
        apiHelper.apiCoordinates(location)
          .then(coordinates => {
            apiHelper.apiForecast(coordinates)
              .then(forecast => {
                response.status(200).send(formatHelper.formatFullForecast(location, forecast))
              })
              .catch(error => {response.status(500).json({ error });
              });
          })
          .catch(error => {response.status(500).json({ error });
          });
      } else {
        return response.status(401).json({ error: "Please supply a valid API key" });
      }
    });
});

module.exports = {
  getForecast
};
