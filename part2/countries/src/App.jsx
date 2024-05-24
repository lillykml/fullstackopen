import { useState, useEffect } from 'react'
import Search from './components/Search'
import Results from './components/Results'
import axios from 'axios'


function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([]) //array of all country names
  const [filteredCountries, setFilteredCountries] = useState([])

  // Stores all country names
  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data.map(country => country.name.common))
      setFilteredCountries(response.data.map(country => country.name.common))
    })
  }, [])
  console.log('Countries', countries)
  console.log('Filtered Countries', filteredCountries)

  const handleSearch = (event) => {
    const newSearch = event.target.value
    setSearchTerm(newSearch)
    setFilteredCountries(countries.filter(country => country.includes(newSearch)))
  }

  const displayCountry = (name) => {
    setFilteredCountries([name])
  }

  return (
    <>
    <Search searchTerm={searchTerm} searchHandler={handleSearch}/>
    <Results countries={filteredCountries} displayHandler={displayCountry}/>
    </>
  )
}

export default App
