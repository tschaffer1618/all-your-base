# Sweater Weather Express

Production Link : https://sweater-weather-express-ts.herokuapp.com/

Project Board: https://github.com/tschaffer1618/sweater-weather-express/projects/1

## Introduction 
Sweater Weather Express is an API built in JavaScript with NodeJS, Knex, and Express. A user of the app can send their API key with various requests to get current forecast information about their favorite cities. 

### Endpoints
##### 1. Get the Detailed Forecast for a City

Request: 

    GET /api/v1/forecast?location=denver,co

    body:
    {
      "api_key": "<user_api_key>"
    }

Example Response:
    
    {
        "location": "Denver,CO",
        "currently": {
            "time": 1574377362,
            "summary": "Overcast",
            "icon": "cloudy",
            "nearestStormDistance": 3,
            "nearestStormBearing": 338,
            "precipIntensity": 0.003,
            "precipIntensityError": 0.001,
            "precipProbability": 0.01,
            "precipType": "snow",
            "precipAccumulation": 0.0729,
            "temperature": 29.15,
            "apparentTemperature": 25.3,
            "dewPoint": 26.62,
            "humidity": 0.9,
            "pressure": 1021.4,
            "windSpeed": 3.58,
            "windGust": 7.59,
            "windBearing": 14,
            "cloudCover": 0.98,
            "uvIndex": 0,
            "visibility": 8.419,
            "ozone": 301.9
        },
        "hourly": {
            "summary": "Foggy tonight.",
            "icon": "snow",
            "data": [
                {
                    "time": 1574377200,
                    "summary": "Overcast",
                    "icon": "cloudy",
                    "precipIntensity": 0.0053,
                    "precipProbability": 0.15,
                    "precipType": "snow",
                    "precipAccumulation": 0.0586,
                    "temperature": 29.17,
                    "apparentTemperature": 25.32,
                    "dewPoint": 26.62,
                    "humidity": 0.9,
                    "pressure": 1021.3,
                    "windSpeed": 3.58,
                    "windGust": 7.58,
                    "windBearing": 14,
                    "cloudCover": 0.98,
                    "uvIndex": 0,
                    "visibility": 8.461,
                    "ozone": 301.9
                }
            ]
        },
        "daily": {
            "summary": "Possible light snow on Monday.",
            "icon": "snow",
            "data": [
                {
                    "time": 1574319600,
                    "summary": "Foggy overnight.",
                    "icon": "fog",
                    "sunriseTime": 1574344380,
                    "sunsetTime": 1574379720,
                    "moonPhase": 0.83,
                    "precipIntensity": 0.0025,
                    "precipIntensityMax": 0.0109,
                    "precipIntensityMaxTime": 1574406000,
                    "precipProbability": 0.35,
                    "precipType": "snow",
                    "precipAccumulation": 0.5,
                    "temperatureHigh": 32,
                    "temperatureHighTime": 1574388000,
                    "temperatureLow": 26.81,
                    "temperatureLowTime": 1574434560,
                    "apparentTemperatureHigh": 26.84,
                    "apparentTemperatureHighTime": 1574388000,
                    "apparentTemperatureLow": 23.87,
                    "apparentTemperatureLowTime": 1574434380,
                    "dewPoint": 25.48,
                    "humidity": 0.87,
                    "pressure": 1020.7,
                    "windSpeed": 4.27,
                    "windGust": 9.01,
                    "windGustTime": 1574319600,
                    "windBearing": 33,
                    "cloudCover": 0.99,
                    "uvIndex": 2,
                    "uvIndexTime": 1574361840,
                    "visibility": 5.389,
                    "ozone": 297.4,
                    "temperatureMin": 26.37,
                    "temperatureMinTime": 1574343060,
                    "temperatureMax": 32.06,
                    "temperatureMaxTime": 1574389080,
                    "apparentTemperatureMin": 20.83,
                    "apparentTemperatureMinTime": 1574343900,
                    "apparentTemperatureMax": 27.24,
                    "apparentTemperatureMaxTime": 1574394720
                }
            ]
        }
    }

#### 2. Add a Favorite Location

Request:

    POST /api/v1/favorites

    body:
    {
      "location": "Denver, CO",
      "api_key": "<user_api_key>"
    }

Example Response:

    {
      "message": "Denver, CO has been added to your favorites",
    }

#### 3. Show All Favorite Locations with a Current Forecast Overview

Request:

    GET /api/v1/favorites

    body:
    {
      "api_key": "<user_api_key>"
    }

Example Response:

      [
        {
            "location": "jacksonville, fl",
            "current_weather": {
                "time": 1574374534,
                "summary": "Clear",
                "icon": "clear-day",
                "nearestStormDistance": 170,
                "nearestStormBearing": 343,
                "precipIntensity": 0,
                "precipProbability": 0,
                "temperature": 63.78,
                "apparentTemperature": 63.78,
                "dewPoint": 55.93,
                "humidity": 0.76,
                "pressure": 1023.3,
                "windSpeed": 6.78,
                "windGust": 9.59,
                "windBearing": 44,
                "cloudCover": 0.18,
                "uvIndex": 0,
                "visibility": 7.808,
                "ozone": 261.6
            }
        },
        {
            "location": "denver, co",
            "current_weather": {
                "time": 1574374534,
                "summary": "Possible Flurries",
                "icon": "snow",
                "nearestStormDistance": 1,
                "nearestStormBearing": 344,
                "precipIntensity": 0.003,
                "precipIntensityError": 0.001,
                "precipProbability": 0.68,
                "precipType": "snow",
                "precipAccumulation": 0.0789,
                "temperature": 28.95,
                "apparentTemperature": 24.63,
                "dewPoint": 26.3,
                "humidity": 0.9,
                "pressure": 1020.5,
                "windSpeed": 3.93,
                "windGust": 7.54,
                "windBearing": 30,
                "cloudCover": 0.94,
                "uvIndex": 0,
                "visibility": 6.532,
                "ozone": 302
            }
        }
    ]

#### 4. Remove a Favorite Location

Request:

    DELETE /api/v1/favorites

    body:
    {
      "location": "Denver, CO",
      "api_key": "<user_api_key>"
    }

Example Response: 

No response (Status 204)

## Tech Stack

### Primary

- Language: JavaScript
- Runtime Environment: NodeJS
- Framework: Express(4.16.1)
- Database: PostgreSQL(7.8.0)
- ORM: Knex(0.19.5)
- Testing: Jest(24.9.0)

### Other Dependencies 

- `figaro-js` for securing environment variables
- `node-fetch` for calling external APIs

## Local Setup

- `git clone git@github.com:tschaffer1618/sweater-weather-express.git`
- `npm install`
- `psql` followed by `CREATE DATABASE sweater_weather_dev`
- `knex migrate:latest`
- `knex seed:run` if you would like to seed the database
- Create a `config/application.yml` with the following configuration:

        GOOGLE_API_KEY: "<YOUR_GOOGLE_GEOCODE_API_KEY>"
        DARK_SKY_API_KEY: "<YOUR_DARKSKY_API_KEY>"

        development:
            IS_DEV: true

        production:
            IS_PROD: true
        
- `npm start` or `node app.js` to start the local server
