import React from 'react'
import Weather from './Weather'

const CountryDetail = ({country}) => {

  const languages = () => country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)

  return (
    <div>
      <h3>{country.name}</h3>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>

      <h4>languages</h4>
      <ul>{languages()}</ul>
      <img src={country.flag} alt={country.name} height="200px" width="300px"/>
      <Weather capital={country.capital}/>
    </div>
  )
}

export default CountryDetail
