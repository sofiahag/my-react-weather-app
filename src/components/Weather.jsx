import React, { useState } from 'react';

import Lottie from "lottie-react";

import rain from "../assets/images/rainy.json";
import clouds from "../assets/images/cloudy.json";
import lightning from "../assets/images/thunder.json";
import snow from "../assets/images/snowy.json";
import mist from "../assets/images/misty.json";
import sun from "../assets/images/sunny.json";
import error from "../assets/images/error.json";


// Todo: Add autocomplete to search query, add gradients to background and different text colors based on background color

const api = {
  key: "cee115a29eaa2e91bdfcd41ebe04c252",
  base: "https://api.openweathermap.org/data/2.5/"
}

function Weather() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [sky, setSky] = useState('linear-gradient(#799cf2, #b194f5, #f593e1, #f5e994)');

  const clearSky = 'linear-gradient(#48a6ee, #48a6ee, #f2d079)';
  const dustySky = 'linear-gradient(#e66465, #9198e5)';
  const cloudySky = 'linear-gradient(#48a6ee, #48a6ee, #88b8dd, #abcde7)'; 
  const rainySky = 'linear-gradient(#696969, #696969, #b7c1d0)'; 
  const mistySky = 'linear-gradient(#48a6ee, #7eb6d6, #d1dee8)'; 

  const search = async evt => {
      await fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then(result => result.json())
        .then(result => {
          if (result.message === 'city not found'){
            alert('We cannot find that country or city, please check your spelling!');  
            result = 'Error';
          }
          else {
            toggleBg(result.weather[0].main);
          }
          setWeather(result);
          setQuery('');
          return result;
        });
  }

  function toggleBg (w_data) {
    switch (w_data) {
      case 'Clear':
          setSky(clearSky);
          break;
      case 'Rain':
      case 'Drizzle':
      case 'Thunderstorm':
          setSky(rainySky);
          break;
      case 'Clouds':
          setSky(cloudySky);
          break;
      case 'Mist':
      case 'Haze':
      case 'Fog':
      case 'Snow':
          setSky(mistySky);
          break;
      case 'Dust':
      case 'Smoke':
          setSky(dustySky);
          break;
      default:
          setSky(clearSky);
    }
  };

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    search();
  };

  return (
    <main style={{background: sky}}>
      <div className="flex flex-col items-center">
        <h1 className="py-9 text-white drop-shadow-md max-sm:py-6 text-5xl max-sm:text-4xl font-sofia mt-12 max-sm:mt-6">
                  Current weather
        </h1>
        <div className="py-6">
        <form onSubmit={handleSubmit}>
          <label for="search" className="hidden">Search</label>
          <input 
            id="search"
            type="text"
            className="search-bar border-fuchsia-400 border-2 px-4 py-3 text-left md:w-[500px] lg:w-[1000px]"
            placeholder="Enter country or city"
            onChange={e => setQuery(e.target.value)}
            value={query}
          />
          <button type="submit" className="px-4 py-3 border-2 border-fuchsia-600 bg-fuchsia-600 text-white">
            Search
          </button>
          </form>
        </div>
        </div> 
        {(weather === 'Error') ? (
          <div className="weather">
            <Lottie animationData={error} loop={true} style={{ height: 300, marginTop: '50px' }}/>
          </div>
        ) : ("")}
        {(typeof weather.main != "undefined") ? (
          <div>
            {(weather.weather[0].main === 'Clouds') ? (
              <div className="weather xl:mt-0 md:mt-100 max-sm:mt-200">
                <Lottie animationData={clouds} loop={true} />
              </div>
            ) : ("")}
            {(weather.weather[0].main === 'Thunderstorm') ? (
              <div className="weather xl:mt-0 md:mt-100 max-sm:mt-100">
                <Lottie animationData={lightning} loop={true} />
              </div>
            ) : ("")}
            {(weather.weather[0].main === 'Drizzle' || weather.weather[0].main === 'Rain') ? (
              <div className="weather xl:mt-0 md:mt-0 max-sm:mt-0">
                <Lottie animationData={rain} loop={true} />
              </div>
            ) : ("")}
            {(weather.weather[0].main === 'Clear') ? (
              <div className="weather xl:mt-20 md:mt-200 max-sm:mt-200">
                <Lottie animationData={sun} loop={true} />
              </div>
            ) : ("")}
            {(weather.weather[0].main === 'Snow') ? (
              <div className="weather md:mt-100 max-sm:mt-100">
                <Lottie animationData={snow} loop={true} />
              </div>
            ) : ("")}
            {(weather.weather[0].main === 'Mist' || weather.weather[0].main === 'Fog' 
                || weather.weather[0].main === 'Dust' || weather.weather[0].main === 'Smoke' 
                || weather.weather[0].main === 'Haze') ? (
              <div className="weather xl:mt-0 md:mt-100 max-sm:mt-200">
                <Lottie animationData={mist} loop={true} />
              </div>
            ) : ("")}
          <div className="location-box text-white drop-shadow-md">
            <div className="location drop-shadow-md text-2xl mt-8 max-sm:mt-4 py-2 max-sm:py-4">{weather.name}, {weather.sys.country}</div>
            <div className="date text-white drop-shadow-md italic">{dateBuilder(new Date())}</div>
            <div className="text-md">Humidity: {weather.main.humidity}%</div>
            <div className="text-md">Wind: {weather.wind.speed} m/s</div>
            <div className="text-md">Clouds: {weather.clouds.all}%</div>
            <div className="text-white drop-shadow-md mt-2 text-2xl max-sm:text-2xl">{weather.weather[0].main}</div>
          </div>
          <div className="weather-box mt-2">
            <div className="temp temp-font drop-shadow-md font-outline-2 text-8xl">
              {Math.round(weather.main.temp)}°C
            </div>
          </div>
        </div>
        ) : ("")}
    </main>
  );
}

export default Weather;
