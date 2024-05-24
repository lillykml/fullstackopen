import { useState, useEffect } from 'react'
import Search from './components/Search'
import Results from './components/Results'
import axios from 'axios'
import Country from './components/Country'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([]) //array of all country names
  const [filteredCountries, setFilteredCountries] = useState(countries)
  const [country, setCountry] = useState(null)

  // Stores all country names
  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data.map(country => country.name.common))
    })
  }, [])

  // Download individual country data
  useEffect(()=> {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/Switzerland`)
    .then(response => {
        setCountry(response.data)
      })}, [])

  const handleSearch = (event) => {
    const newSearch = event.target.value
    setSearchTerm(newSearch)
    setFilteredCountries(countries.filter(country => country.includes(newSearch)))
  }

  return (
    <>
    <Search searchTerm={searchTerm} searchHandler={handleSearch}/>
    <Results countries={filteredCountries}/>
    <Country country={country} />
     
    </>
  )
}

export default App
