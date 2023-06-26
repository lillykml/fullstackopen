const Country = ({country}) => {

    return(
        <>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>Languages</h2>
        <ul>
            {Object.entries(country.languages).map(entry => <li key={entry[0]}>{entry[1]}</li>)}
        </ul>
        <img src={country.flags.png} alt="The countries flag"/>
        </>
    )
}

export default Country;