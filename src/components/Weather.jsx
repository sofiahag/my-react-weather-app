import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Typography, Box, ThemeProvider, createTheme } from '@mui/material';
import Lottie from 'lottie-react';

import rain from '../assets/images/rainy.json';
import clouds from '../assets/images/cloudy.json';
import lightning from '../assets/images/thunder.json';
import snow from '../assets/images/snowy.json';
import mist from '../assets/images/misty.json';
import sun from '../assets/images/sunny.json';
import error from '../assets/images/error.json';

const api = {
  key: `${process.env.REACT_APP_WEATHER_API_KEY}`,
  base: 'https://api.openweathermap.org/data/2.5/',
};

const theme = createTheme({
  typography: {
    fontFamily: 'Sofia Pro, Arial, Helvetica, sans-serif',
    textAlign: 'center',
  },
  palette: {
    primary: {
      main: '#c2410c'
    }
  }
});

const weatherAnimations = {
  Clear: sun,
  Dust: mist,
  Smoke: mist,
  Clouds: clouds,
  Rain: rain,
  Drizzle: rain,
  Thunderstorm: lightning, 
  Mist: mist,
  Haze: mist,
  Fog: mist,
  Snow: snow,
}; 

const initialSky = {
  Clear: 'linear-gradient(#48a6ee, #48a6ee, #f2d079)',
  Dust: 'linear-gradient(#8ab5dc, #aeb3b8)',
  Smoke: 'linear-gradient(#8ab5dc, #aeb3b8)',
  Clouds: 'linear-gradient(#48a6ee, #48a6ee, #88b8dd, #abcde7)',
  Rain: 'linear-gradient(#696969, #696969, #b7c1d0)',
  Drizzle: 'linear-gradient(#696969, #696969, #b7c1d0)',
  Thunderstorm: 'linear-gradient(#696969, #696969, #b7c1d0)',
  Mist: 'linear-gradient(#48a6ee, #7eb6d6, #d1dee8)',
  Haze: 'linear-gradient(#48a6ee, #7eb6d6, #d1dee8)',
  Fog: 'linear-gradient(#48a6ee, #7eb6d6, #d1dee8)',
  Snow: 'linear-gradient(#48a6ee, #7eb6d6, #d1dee8)',
};

//TODO: add styles to CSS

function Weather() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [sky, setSky] = useState('linear-gradient(#799cf2, #b194f5, #f5a793, #f5e994)');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const formRef = useRef(null);

  const backgroundStyles = {
    background: sky,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%', 
    height: '100vh', 
    overflow: 'hidden'
  };

  const isLargeScreen = windowWidth > 1501;
  const isLaptopScreen = windowWidth >= 1025 && windowWidth <= 1500;
  const isMediumScreen = windowWidth >= 768 && windowWidth <= 1024;
  const isSmallScreen = windowWidth < 768;
  
  const weatherBoxStyles = {
    position: 'absolute',
    zIndex: '1',
    top: isMediumScreen ? '48%' : (isLargeScreen ? '50%' : (isLaptopScreen ? '70%' : '70%')),
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const textFieldStyles = {
    backgroundColor: 'white',
    width: isSmallScreen ? '100%' : '250%',
    marginTop: '40px',
    marginLeft: isSmallScreen ? '0' : '-75%',
  };
  
  const buttonStyles = {
    width: isSmallScreen ? '100%' : '250%',
    marginLeft: isSmallScreen ? '0' : '-75%',
    marginTop: '10px',
  };

  const lottieStyles = {
    marginTop: 
      weather.weather && weather.weather.length > 0 && weather.weather[0].main === 'Rain' && isMediumScreen ? '0%' :
      (isLargeScreen || isLaptopScreen ? '0%' :
      (weather.weather && weather.weather.length > 0 && weather.weather[0].main === 'Rain' && isSmallScreen ? '0%' : 
      '30%'))
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (weather.main && weather.weather) {
      const condition = weather.weather[0].main;
      setSky(initialSky[condition] || initialSky.Clear);
    }
  }, [weather]);  

  const search = async () => {
    try {
      const response = await fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`);
      const result = await response.json();
      if (response.ok) {
        setWeather(result);
        setQuery('');
      } else {
        setWeather({ error: result.message || 'City not found' });
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather({ error: 'Error fetching weather data' });
    }
  };

  const dateBuilder = (d) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search();
  };

  return (
    <ThemeProvider theme={theme}>
    <div style={{ ...backgroundStyles }} component="main">
      <Box textAlign="center" mt={8}>
        <Typography variant="h3" style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
          Current weather
        </Typography>
        <Box mt={3} display="flex" justifyContent="center">
          <form onSubmit={handleSubmit} ref={formRef}>
            <TextField
              id="search"
              type="text"
              variant="outlined"
              placeholder="Enter country or city"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              fullWidth
              style={textFieldStyles}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth style={buttonStyles}>
              <Typography variant="button" style={{ fontSize: '1.1rem', marginTop: '1%' }}>Search</Typography>
            </Button>
          </form>
          </Box>
        </Box>
      {weather.error && (
        <Box style={lottieStyles}>
          <Lottie animationData={error} loop />
        </Box>
      )}
      {weather.main && (
          <Box className="lottie-box" style={lottieStyles}>
            <Lottie animationData={weatherAnimations[weather.weather[0].main]} loop />
          </Box>
      )}
      {weather.main && weather.sys && (
        <Box style={weatherBoxStyles}>
          <Box className="location-box" textAlign="center">
            <Typography className="location" variant="h5" style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
              {weather.name}, {weather.sys.country}
            </Typography>
            <Typography className="date" variant="subtitle2" style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
              {dateBuilder(new Date())}
            </Typography>
            <Typography className="text-md" variant="body2" style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
              Humidity: {weather.main.humidity}%
            </Typography>
            <Typography className="text-md" variant="body2" style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
              Wind: {weather.wind.speed} m/s
            </Typography>
            <Typography className="text-md" variant="body2" style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
              Clouds: {weather.clouds.all}%
            </Typography>
            <Typography variant="h5" style={{ color: 'white', fontSize: '1.7rem', marginTop: '2px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
              {weather.weather[0].main}
            </Typography>
          </Box>
          <Box className="weather-box" textAlign="center">
            <Box className="temp" style={{ display: 'inline-block', position: 'relative', margin: '5px 0 0 0', padding: '20px 20px 10px 20px', backgroundColor: 'rgba(255, 255, 255, 0.507)', borderRadius: '30px', boxShadow: '3px 4px rgba(76, 76, 76, 0.412)' }}>
              <Typography variant="h1" color="primary">
                {Math.round(weather.main.temp)}°C
              </Typography>
            </Box>
          </Box>
        </Box>
        )}
      </div>
    </ThemeProvider>
  );
}

export default Weather;
