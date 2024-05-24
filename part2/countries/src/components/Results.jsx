import { useState, useEffect } from "react"
import axios from "axios"
import Country from "./Country"


const Results = ({countries, displayHandler}) => {

    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (countries.length === 1){
        return <Country countryName={countries[0]} />
    }
    else {
        return (
            <ul>
                {countries.map(country => <li key={country}>{country} <button onClick={()=>displayHandler(country)}>show</button></li>)}
            </ul>
        )
    }
}

export default Results