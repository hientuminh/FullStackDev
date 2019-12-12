import React from 'react'
import CountryDetail from './CountryDetail'

const CountryName = ({countryName, country}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    return country(e.target.value)
  }
  return (
    <div>
      {countryName} <button value={countryName} onClick={(e) => handleSubmit(e)}> show </button>
    </div>
  )
}

const CountryList = ({countries, onShowCountryDetail}) => {

  if (countries.length === 0) {
    return (<></>)
  }
  if (countries.length <= 10 && countries.length > 1) {
    const countriesName = () => countries.map(country =>
      <CountryName key={country.name} countryName={country.name} country={onShowCountryDetail}/>
    )
    return (
      <div>{countriesName()}</div>
    )
  } else if (countries.length > 10) {
    return (
      <p>Too many matches, specify anthor filter</p>
    )
  }
  return (
    <CountryDetail country={countries[0]}/>
  )
}

export default CountryList
