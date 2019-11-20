var express = require("express");
var router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);

router.get("/", (request, response) => {
  database("favorites")
    .select()
    .then(favorites => {
      response.status(200).json(favorites);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

module.exports = router;
