var express = require("express");
var router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);

const showFavorites = router.get("/", (request, response) => {
  const userApiKey = request.body.api_key;
  database("users")
    .where("api_key", userApiKey)
    .then(user => {
      if (user[0]) {
        database("favorites")
          .where("user_id", user[0].id)
          .select("location")
          .then(favorites => {
            response.status(200).json(favorites);
          })
          .catch(error => {
            response.status(500).json({ error });
          });
      } else {
        return response
          .status(401)
          .json({ error: "Please supply a valid API key" });
      }
    });
});

const createFavorite = router.post("/", (request, response) => {
  const favorite = request.body;
  const userApiKey = favorite.api_key;
  const location = favorite.location;
  for (let requiredParameter of ["api_key", "location"]) {
    if (!favorite[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { api_key: <String>, location: <String> }. You're missing a "${requiredParameter}" property.`
      });
    }
  }
  database("users")
    .where("api_key", userApiKey)
    .then(user => {
      if (user[0]) {
        database("favorites")
          .where("location", location)
          .then(favorite => {
            if (favorite[0]) {
              return response
                .status(200)
                .json({ message: `You have already favorited ${location}` });
            } else {
              database("favorites")
                .insert({ user_id: user[0].id, location: location })
                .then(favorite => {
                  response.status(200).json({
                    message: `${location} has been added to your favorites`
                  });
                })
                .catch(error => {
                  response.status(500).json({ error });
                });
            }
          });
      } else {
        return response
          .status(401)
          .json({ error: "Please supply a valid API key" });
      }
    });
});

const deleteFavorite = router.delete("/", (request, response) => {
  const favorite = request.body;
  const userApiKey = favorite.api_key;
  const location = favorite.location;
  for (let requiredParameter of ["api_key", "location"]) {
    if (!favorite[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { api_key: <String>, location: <String> }. You're missing a "${requiredParameter}" property.`
      });
    }
  }
  database("users")
    .where("api_key", userApiKey)
    .then(user => {
      if (user[0]) {
        database("favorites")
          .where("location", location)
          .then(favorite => {
            if (favorite[0]) {
              database("favorites")
                .del()
                .where({ user_id: user[0].id, location: location })
                .then(favorite => {
                  response.status(204).json({
                    message: `${location} has been removed from your favorites`
                  });
                })
                .catch(error => {
                  response.status(500).json({ error });
                });
            } else {
              return response
                .status(400)
                .json({ message: `${location} is not in your favorites` });
            }
          });
      } else {
        return response
          .status(401)
          .json({ error: "Please supply a valid API key" });
      }
    });
});

module.exports = {
  showFavorites,
  createFavorite,
  deleteFavorite
};
