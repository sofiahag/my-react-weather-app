import React, { useState } from 'react';
import Lottie from "lottie-react";
import rainyAnimation from "./assets/animation_ll9roi4j.json";
import cloudyAnimation from "./assets/animation_ll8ca4ib.json";
import sunnyAnimation from "./assets/animation_ll8c8mxp.json";
import thunderAnimation from "./assets/animation_ll8cbm4a.json";
import snowyAnimation from "./assets/animation_ll9t5myw.json";

// Todo: Add autocomplete to search query, error message for incorrect spelling, and dark mode

const api = {
  key: "cee115a29eaa2e91bdfcd41ebe04c252",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
  }

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
    <main className={(typeof weather.main != "undefined")}>
      <div className="flex flex-col items-center">
        <h1 className="py-9 max-sm:py-6 text-5xl max-sm:text-4xl font-sofia mt-14 max-sm:mt-6
                bg-gradient-to-r from-orange-700 via-pink-700 to-orange-700 inline-block text-transparent
                bg-clip-text font-outline-2">
                  Current weather
        </h1>
        <div className="py-6">
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            className="search-bar px-4 py-3 text-left md:w-[500px] lg:w-[1000px]"
            placeholder="Enter country or city"
            onChange={e => setQuery(e.target.value)}
            value={query}
          />
          <button type="submit" className="px-4 py-3 bg-orange-700 text-white">
            Search
          </button>
          </form>
        </div>
        </div> 
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box text-pink-700">
            <div className="location text-2xl mt-10 max-sm:mt-4 py-2 max-sm:py-4">{weather.name}, {weather.sys.country}</div>
            <div className="date text-gray-600 italic">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp bg-gradient-to-b from-pink-600 via-orange-700 to-pink-600 text-transparent
                bg-clip-text text-8xl">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="lottie">
            <div className="weather text-gray-600 mt-10 mr-1 text-lg max-sm:text-2xl italic">{weather.weather[0].main}</div>
            {(weather.weather[0].main === 'Clouds') ? (
              <Lottie animationData={cloudyAnimation} loop={true} style={{ width: 80, height: 80, padding: 0, marginTop: '12px' }} />
            ) : ('')}
            {(weather.weather[0].main === 'Thunderstorm') ? (
              <Lottie animationData={thunderAnimation} loop={true} style={{ width: 80, height: 80, padding: 0, marginTop: '12px' }} />
            ) : ('')}
            {(weather.weather[0].main === 'Drizzle' || weather.weather[0].main === 'Rain') ? (
              <Lottie animationData={rainyAnimation} loop={true} style={{ width: 80, height: 80, padding: 0, marginTop: '12px' }} />
            ) : ('')}
            {(weather.weather[0].main === 'Clear') ? (
              <Lottie animationData={sunnyAnimation} loop={true} style={{ width: 80, height: 80, padding: 0, marginTop: '12px' }} />
            ) : ('')}
            {(weather.weather[0].main === 'Snow') ? (
              <Lottie animationData={snowyAnimation} loop={true} style={{ width: 80, height: 80, padding: 0, marginTop: '12px' }} />
            ) : ('')}
            </div>
          </div>
        </div>
        ) : ("Waiting for location...")}
    </main>
  );
}

export default App;
