import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios';
import CountryList from './components/CountryList';

function App() {

  const [countryFilter, setCountryFilter] = useState("")
  const [countries, setCountries] = useState([])
  const [matchingCountries, setMatchingCountries] = useState([])

  useEffect(() => {
    console.log("Effect starts")
    axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then(response => {
      console.log("Promise fullfilled")
      setCountries(countries.concat(response.data))
    })
  }, [])
  
  const matchingCountryHandler = (filterValue) => {
    setMatchingCountries(countries.filter(c => c.name.common.includes(filterValue)))
  }

  const countryFilterHandler = (event) => {
    const filterValue = event.target.value
    setCountryFilter(filterValue)
    matchingCountryHandler(filterValue)
  }

  const showCountryHandler = (country) => {
    setMatchingCountries([country])
  }

  return (
    <>
    <label>Find countries</label>
    <input value={countryFilter} onChange={countryFilterHandler}/>
    <CountryList countries={matchingCountries} showHandler={showCountryHandler}/>
    </>
  );
}

export default App;
