// OpenWeatherMap API
const API_KEY = "YOUR_API_KEY_HERE";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// DOM Elements
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");

// Elements to update
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

async function getWeather(city) {

    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {

        showLoading();
        hideError();

        const response = await fetch(url);

        if (!response.ok) {

            if (response.status === 404) {
                throw new Error("City not found");
            }

            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        displayWeather(data);

        saveToHistory(city);

    } catch (err) {

        showError(err.message);

    } finally {

        hideLoading();

    }

}


