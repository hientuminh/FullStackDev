import React, { useState, useEffect } from 'react'
import countriesService from './services/countries'

import Filter from './components/Filter'
import CountryList from './components/CountryList'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    if (searchName !== '') {
      setTimeout(function() {
        countriesService.findByName(searchName).then(response => setCountries(response))
      }, 1000)
    } else {
      countriesService.getAll().then(response => setCountries(response))
    }
  }, [searchName])

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  const handleShowCountryDetail = (chooseCountry) => {
    setSearchName(chooseCountry)
  }
  return (
    <div>
      <Filter searchName={searchName} onFilterChange={handleSearchName}/>
      <CountryList countries={countries} onShowCountryDetail={handleShowCountryDetail}/>
    </div>
  )
}

export default App
