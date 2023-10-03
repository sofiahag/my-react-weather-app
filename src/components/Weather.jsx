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
  const [sky, setSky] = useState('#fbe7f5');

  const clearSky = '#ecf7fd';
  const dustySky = '#efe6db';
  const cloudySky = '#e1e5ec'; 

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
      case 'Clouds':
      case 'Rain':
      case 'Drizzle':
      case 'Thunderstorm':
      case 'Mist':
      case 'Haze':
      case 'Fog':
      case 'Snow':
          setSky(cloudySky);
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
    <main style={{backgroundColor: sky}}>
      <div className="flex flex-col items-center">
        <h1 className="py-9 max-sm:py-6 text-5xl max-sm:text-4xl font-sofia mt-12 max-sm:mt-6
                bg-gradient-to-r from-sky-900 via-sky-700 to-sky-900 inline-block text-transparent
                bg-clip-text font-outline-2">
                  Current weather
        </h1>
        <div className="py-6">
        <form onSubmit={handleSubmit}>
          <label for="search" className="hidden">Search</label>
          <input 
            id="search"
            type="text"
            className="search-bar border-pink-300 border-2 px-4 py-3 text-left md:w-[500px] lg:w-[1000px]"
            placeholder="Enter country or city"
            onChange={e => setQuery(e.target.value)}
            value={query}
          />
          <button type="submit" className="px-4 py-3 border-2 border-sky-800 bg-gradient-to-r from-sky-900 via-sky-700
             to-sky-900 text-white">
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
          <div className="location-box text-sky-800">
            <div className="location text-2xl mt-8 max-sm:mt-4 py-2 max-sm:py-4">{weather.name}, {weather.sys.country}</div>
            <div className="date text-gray-700 dark:text-white italic">{dateBuilder(new Date())}</div>
            <div className="text-md">Humidity: {weather.main.humidity}%</div>
            <div className="text-md">Wind: {weather.wind.speed} m/s</div>
            <div className="text-md">Clouds: {weather.clouds.all}%</div>
            <div className="text-gray-600 dark:text-white mt-2 text-2xl max-sm:text-2xl">{weather.weather[0].main}</div>
          </div>
          <div className="weather-box">
            <div className="temp bg-gradient-to-b from-sky-500 to-sky-900 text-transparent
                bg-clip-text text-8xl">
              {Math.round(weather.main.temp)}°C
            </div>
          </div>
        </div>
        ) : ("")}
    </main>
  );
}

export default Weather;
