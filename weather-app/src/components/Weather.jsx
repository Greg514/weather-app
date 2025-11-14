import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import "./Weather.css";

import search from "../assets/weather-icons/icons8-search-48.png";
import sun from "../assets/weather-icons/icons8-sun-48.png";
import cloudy from "../assets/weather-icons/icons8-cloudy-48.png";
import rain from "../assets/weather-icons/icons8-rain-48.png";
import snow from "../assets/weather-icons/icons8-snow-48.png";
import drizzle from "../assets/weather-icons/icons8-drizzle-48.png";
import wind from "../assets/weather-icons/icons8-wind-24.png";
import humidity from "../assets/weather-icons/icons8-humidity-50.png";

const allIcons = {
  "01d": sun,
  "01n": sun,
  "02d": cloudy,
  "02n": cloudy,
  "03d": drizzle,
  "03n": drizzle,
  "09d": rain,
  "09n": rain,
  "10d": snow,
  "10n": snow,
};

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const inputRef = useRef();

  const Search = useCallback(async (city = "") => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=295c9de93ddfa0a2498fd78610369db4`;

      const response = await axios.get(url);
      const data = response.data;

      if (!data.weather || !data.main) {
        console.error("City not found or invalid response:", data);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || sun;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon,
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  }, []);

  useEffect(() => {
    Search("Toronto"); 
  }, [Search]);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search city..." />
        <img
          src={search}
          alt="search"
          onClick={() => Search(inputRef.current.value)}
        />
      </div>

      {weatherData && (
        <>
          <img src={weatherData.icon} alt="weather" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity} alt="humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind} alt="wind" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
