const fetch = require("node-fetch");

const Figaro = require("figaro-js");
Figaro.load();

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

module.exports = {
  apiCoordinates,
  apiForecast
}
