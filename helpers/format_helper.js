function formatFullForecast(location, forecast) {
  var fullForecast = {
    location: location,
    currently: forecast.currently,
    hourly: forecast.hourly,
    daily: forecast.daily
  };
  return fullForecast;
}

module.exports = {
  formatFullForecast
}
