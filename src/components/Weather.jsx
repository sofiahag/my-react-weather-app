import React, { useState, useEffect } from 'react';
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

function Weather() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [sky, setSky] = useState('linear-gradient(#799cf2, #b194f5, #f5a793, #f5e994)');

  const clearSky = 'linear-gradient(#48a6ee, #48a6ee, #f2d079)';
  const dustySky = 'linear-gradient(#8ab5dc, #aeb3b8)';
  const cloudySky = 'linear-gradient(#48a6ee, #48a6ee, #88b8dd, #abcde7)';
  const rainySky = 'linear-gradient(#696969, #696969, #b7c1d0)';
  const mistySky = 'linear-gradient(#48a6ee, #7eb6d6, #d1dee8)';

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const backgroundStyles = {
    background: sky,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

  const isMediumScreen = windowWidth >= 768 && windowWidth <= 1024;
  const isSmallScreen = windowWidth < 768;
  
  const weatherBoxStyles = {
    position: 'absolute',
    zIndex: '1',
    top: isMediumScreen ? '48%' : '70%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const textFieldStyles = {
    backgroundColor: 'white',
    width: isSmallScreen ? '100%' : '200%',
    marginTop: '40px',
    marginLeft: isSmallScreen ? '0' : '-50%',
  };
  
  const buttonStyles = {
    width: isSmallScreen ? '100%' : '200%',
    marginLeft: isSmallScreen ? '0' : '-50%',
    marginTop: '10px',
  };

  const lottieStyles = {
    marginTop: isMediumScreen ? '30%' : (isSmallScreen ? '55%' : '10%'),
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

  const search = async () => {
    try {
      const response = await fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`);
      const result = await response.json();
      if (response.ok) {
        toggleBg(result.weather[0].main);
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

  const toggleBg = (w_data) => {
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
    <div style={{ ...backgroundStyles, width: '100%', height: '100vh', overflow: 'hidden' }} component="main">
      <Box textAlign="center" mt={8}>
        <Typography variant="h3" style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
          Current weather
        </Typography>
        <Box mt={3} display="flex" justifyContent="center">
          <form onSubmit={handleSubmit}>
            <TextField
              id="search"
              type="text"
              variant="outlined"
              fullWidth
              placeholder="Enter country or city"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              style={textFieldStyles}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth style={buttonStyles}>
              <Typography variant="button" style={{ fontSize: '1.1rem' }}>Search</Typography>
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
        <Box>
          {weather.weather[0].main === 'Clouds' && (
            <Box style={lottieStyles}>
              <Lottie animationData={clouds} loop />
            </Box>
          )}
          {weather.weather[0].main === 'Thunderstorm' && (
            <Box>
              <Lottie animationData={lightning} loop />
            </Box>
          )}
          {(weather.weather[0].main === 'Drizzle' || weather.weather[0].main === 'Rain') && (
            <Box>
              <Lottie animationData={rain} loop />
            </Box>
          )}
          {weather.weather[0].main === 'Clear' && (
            <Box style={{ marginTop: '330px' }}>
              <Lottie animationData={sun} loop />
            </Box>
          )}
          {weather.weather[0].main === 'Snow' && (
            <Box>
              <Lottie animationData={snow} loop />
            </Box>
          )}
          {(weather.weather[0].main === 'Mist' || weather.weather[0].main === 'Fog'
            || weather.weather[0].main === 'Dust' || weather.weather[0].main === 'Smoke'
            || weather.weather[0].main === 'Haze') && (
            <Box style={{ marginTop: '330px' }}>
              <Lottie animationData={mist} loop />
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
        </Box>
      )}
    </div>
    </ThemeProvider>
  );
}

export default Weather;
