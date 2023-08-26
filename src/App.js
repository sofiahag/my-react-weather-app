import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import rain from "./assets/animation_lls17dru.json";
import clouds from "./assets/animation_llqs6jeg.json";
import sun from "./assets/animation_llqsjsg4.json";
import lightning from "./assets/animation_llrys87i.json";
import snow from "./assets/animation_llqny2zn.json";
import mist from "./assets/animation_lls0btwr.json";
import error from "./assets/animation_lls1jeej.json";
import lightToggle from "./assets/light-bulb.svg";
import darkToggle from "./assets/light-bulb-dark.svg";


// Todo: Add autocomplete to search query

const api = {
  key: "cee115a29eaa2e91bdfcd41ebe04c252",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [theme, setTheme] = useState('light');
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const search = async evt => {
      await fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then(result => result.json())
        .then(result => {
          if (result.message === 'city not found'){
            alert('We cannot find that country or city, please check your spelling!');  
            result = 'Error';
          }
          setWeather(result);
          setQuery('');
          return result;
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
    <main className={(typeof weather.main != "undefined") && (`App ${theme}`)}>
      <div className="flex">
        <button className="toggle mt-5 mr-7" onClick={() => toggleTheme()}>
          <img src={theme === "light" ? lightToggle : darkToggle } alt="toggle" style={{ width: 50 }} />
        </button>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="py-9 max-sm:py-6 text-5xl max-sm:text-4xl font-sofia mt-3 max-sm:mt-6
                bg-gradient-to-r from-sky-700 to-orange-700 inline-block text-transparent
                bg-clip-text font-outline-2 dark:from-fuchsia-500 dark:to-blue-500">
                  Current weather
        </h1>
        <div className="py-6">
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            className="search-bar px-4 py-3 text-left md:w-[500px] lg:w-[1000px] dark:text-slate-200"
            placeholder="Enter country or city"
            onChange={e => setQuery(e.target.value)}
            value={query}
          />
          <button type="submit" className="px-4 py-3 bg-orange-700 text-white dark:text-slate-300 dark:bg-blue-900">
            Search
          </button>
          </form>
        </div>
        </div> 
        {(weather === 'Error') ? (
          <div className="weather">
            <Lottie animationData={error} loop={true} style={{ height: 300, marginTop: '30px' }}/>
          </div>
        ) : ("")}
        {(typeof weather.main != "undefined") ? (
          <div>
            {(weather.weather[0].main === 'Clouds') ? (
              <div className="weather mt-200 lg:-mt-5">
                <Lottie animationData={clouds} loop={true} />
              </div>
            ) : ("")}
            {(weather.weather[0].main === 'Thunderstorm') ? (
              <div className="weather mt-200 lg:mt-0">
                <Lottie animationData={lightning} loop={true} />
              </div>
            ) : ("")}
            {(weather.weather[0].main === 'Drizzle' || weather.weather[0].main === 'Rain') ? (
              <div className="weather mt-200 lg:mt-0">
                <Lottie animationData={rain} loop={true} />
              </div>
            ) : ("")}
            {(weather.weather[0].main === 'Clear') ? (
              <div className="weather mt-200 lg:-mt-5">
                <Lottie animationData={sun} loop={true} />
              </div>
            ) : ("")}
            {(weather.weather[0].main === 'Snow') ? (
              <div className="weather mt-200 lg:mt-0">
                <Lottie animationData={snow} loop={true} />
              </div>
            ) : ("")}
            {(weather.weather[0].main === 'Mist' || weather.weather[0].main === 'Fog' 
                || weather.weather[0].main === 'Dust' || weather.weather[0].main === 'Smoke' 
                || weather.weather[0].main === 'Haze') ? (
              <div className="weather mt-200 lg:-mt-14">
                <Lottie animationData={mist} loop={true} />
              </div>
            ) : ("")}
          <div className="location-box text-orange-700 dark:text-fuchsia-500">
            <div className="location text-2xl mt-8 max-sm:mt-4 py-2 max-sm:py-4">{weather.name}, {weather.sys.country}</div>
            <div className="date text-gray-600 dark:text-white italic">{dateBuilder(new Date())}</div>
            <div className="text-sm">Humidity: {weather.main.humidity}%</div>
            <div className="text-sm">Wind: {weather.wind.speed} m/s</div>
            <div className="text-sm">Clouds: {weather.clouds.all}%</div>
            <div className="text-gray-600 dark:text-white mt-2 text-2xl max-sm:text-2xl">{weather.weather[0].main}</div>
          </div>
          <div className="weather-box">
            <div className="temp bg-gradient-to-b from-sky-600 to-orange-600 dark:from-fuchsia-500 dark:to-blue-500 text-transparent
                bg-clip-text text-8xl">
              {Math.round(weather.main.temp)}°C
            </div>
          </div>
        </div>
        ) : ("")}
    </main>
  );
}

export default App;
