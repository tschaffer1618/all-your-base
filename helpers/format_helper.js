function formatFullForecast(location, forecast) {
  var fullForecast = {
    location: location,
    currently: forecast.currently,
    hourly: forecast.hourly,
    daily: forecast.daily
  };
  return fullForecast;
}

function formatCurrentForecast(location, forecast) {
  var currentForecast = {
    location: location,
    current_weather: forecast.currently
  };
  return currentForecast;
}

module.exports = {
  formatFullForecast,
  formatCurrentForecast
}
