import React, { useState, useEffect } from 'react'
import countriesService from '../services/weather'

const Weather = ({capital}) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    countriesService
      .getWeatherByCapitalName(capital)
      .then(response => setWeather(response))
  }, [capital])

  if (!weather.current) {
    return (
      <h6>Can NOT get weather API</h6>
    )
  }
  const icon = (weather.current && weather.current.weather_icons) ? weather.current.weather_icons[0] : null
  return (
    <div>
      <p><strong>temperature: </strong> {weather.current.temperature} Celius</p>
      <img src={icon} alt={icon} height="50px" width="50px"/>
      <p><strong>wind: </strong> {weather.current.wind_speed} kph direction {weather.current.wind_dir}</p>
    </div>
  )
}

export default Weather
