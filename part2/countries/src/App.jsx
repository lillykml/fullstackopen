import { useState, useEffect } from 'react'
import Search from './components/Search'
import Results from './components/Results'
import axios from 'axios'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([]) //array of all country names
  const [filteredCountries, setFilteredCountries] = useState(countries)

  // Stores all country names
  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data.map(country => country.name.common))
    })
  }, [])

  const handleSearch = (event) => {
    const newSearch = event.target.value
    setSearchTerm(newSearch)
    setFilteredCountries(countries.filter(country => country.includes(newSearch)))
  }

  return (
    <>
    <Search searchTerm={searchTerm} searchHandler={handleSearch}/>
    <Results countries={filteredCountries}/>
    </>
  )
}

export default App
