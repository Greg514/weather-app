import React, { useEffect } from "react";
import "./Weather.css";
import search from "../assets/weather-icons/icons8-search-48.png";
import sun from "../assets/weather-icons/icons8-sun-48.png";
import cloudy from "../assets/weather-icons/icons8-cloudy-48.png"
import rain from "../assets/weather-icons/icons8-rain-48.png"
import snow from "../assets/weather-icons/icons8-snow-48.png"
import drizzle from "../assets/weather-icons/icons8-drizzle-48.png"
import wind from "../assets/weather-icons/icons8-wind-24.png";
import humidity from "../assets/weather-icons/icons8-humidity-50.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const allIcons = {
    "01d":sun,
    "01n":sun,
    "02d":cloudy,
    "02n":cloudy,
    "03d":drizzle,
    "03n":drizzle,
    "09d":rain,
    "09n":rain,
    "10d ":snow,
    "10n":snow

  }

  const Search = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=dallas&appid=295c9de93ddfa0a2498fd78610369db4`;

      const response = await fetch(url);
      const data = await response.json();

      console.log(data);

      const icon = allIcons[data.weather[0].icon]|| sun;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: data.main.temp,
        location: data.name,
        icon: icon
      });


    } catch (error) {
      console.error("error fetching weather",error);
    }
  };

  useEffect(() => {
    Search("");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="search" />
        <img src={search} alt="" />
      </div>
      <img src={sun} alt="" className="weather-icon" />
      <p className="temperature">16C</p>
      <p className="location">Miami</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity} alt="" />
          <div>
            <p>91%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind} alt="" />
          <div>
            <p>3.6 km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
