import React, { useState, useEffect } from 'react'
import countriesService from './services/countries'

import Filter from './components/Filter'
import CountryList from './components/CountryList'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchName, setSearchName] = useState('')
  const [chooseCountry, setChooseCountry] = useState('')

  useEffect(() => {
    if (searchName !== '') {
      setTimeout(function() {
        countriesService.findByName(searchName).then(response => setCountries(response))
      }, 3000)
    } else {
      countriesService.getAll().then(response => setCountries(response))
    }
  }, [searchName])

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
    setChooseCountry('')
  }

  const handleShowCountryDetail = (chooseCountry) => {
    setChooseCountry(chooseCountry)
    setSearchName(chooseCountry)
  }
  return (
    <div>

      <Filter searchName={searchName} onChange={handleSearchName}/>
      <CountryList countries={countries} onSubmit={handleShowCountryDetail} chooseCountry={chooseCountry}/>
    </div>
  )
}

export default App
