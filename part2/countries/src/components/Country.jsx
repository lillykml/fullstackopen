import axios from "axios"
import { useState, useEffect } from "react"
import Weather from "./Weather"


const Country = ({countryName}) => {

    const [country, setCountry] = useState(null)

    // Download individual country data
    useEffect(()=> {
        axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
        .then(response => {
            setCountry(response.data)
        })}, [])

    if(country) {
        return (
            <>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital}</p>
                <p>Area {country.area}</p>
                <h2>Languages</h2>
                <ul>
                {Object.entries(country.languages).map(([abbreviation, fullName]) => (
                    <li key={abbreviation}>
                    {fullName}
                    </li>
                ))}
                </ul>
                <img src={country.flags.png} />
                <Weather capital={country.capital}/>
            </>
        )
    }
    else return null
}

export default Country