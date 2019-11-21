var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);

var indexRouter = require("./routes/index");
var favoritesRouter = require("./routes/api/v1/favorites");
var forecastsRouter = require("./routes/api/v1/forecasts");

var app = express();
// app.set("port", process.env.PORT || 3000);
app.locals.title = "Sweater Weather";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1/favorites", favoritesRouter.showFavorites);
app.use("/api/v1/favorites", favoritesRouter.createFavorite);
app.use("/api/v1/favorites", favoritesRouter.deleteFavorite);
app.use("/api/v1/forecast", forecastsRouter.getForecast);

// app.listen(app.get("port"), () => {
//   console.log(`${app.locals.title} is running on ${app.get("port")}.`);
// });

module.exports = app;
