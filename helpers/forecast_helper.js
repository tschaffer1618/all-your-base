var apiHelper = require("./api_helper");
var formatHelper = require("./format_helper")

async function getAllForecasts(arrayOfLocations) {
  var finalArray = await Promise.all(arrayOfLocations.map(async (location) => {
    var coordinates = await apiHelper.apiCoordinates(location.location);
    var forecast = await apiHelper.apiForecast(coordinates);
    return formatHelper.formatCurrentForecast(location.location, forecast);
  }));
  return finalArray;
}

module.exports = {
  getAllForecasts
}
