import React, { useState, useEffect } from 'react'
import countriesService from '../services/weather'

const CountryDetail = ({country}) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    countriesService
      .getWeatherByCapitalName(country.capital)
      .then(response => setWeather(response.current))
  }, [country.capital])

  const languages = () => country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)
  console.log(weather)
  if (weather) {
    const icon = (weather && weather.weather_icons) ? weather.weather_icons[0] : null
    return (
      <div>
        <h3>{country.name}</h3>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>

        <h4>languages</h4>
        <ul>{languages()}</ul>
        <img src={country.flag} alt={country.name} height="200px" width="300px"/>
        <p><strong>temperature: </strong> {weather.temperature} Celius</p>
        <img src={icon} alt={icon} height="50px" width="50px"/>
        <p><strong>wind: </strong> {weather.wind_speed} kph direction {weather.wind_dir}</p>
      </div>
    )
  }
  return (
    <div>
      <h3>{country.name}</h3>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>

      <h4>languages</h4>
      <ul>{languages()}</ul>
      <img src={country.flag} alt={country.name} height="200px" width="300px"/>
      <h6>Can NOT get weather API</h6>
    </div>
  )
}

export default CountryDetail
