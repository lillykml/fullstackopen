const Country = ({country}) => {
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
            </>
        )
    }
    else return null
}

export default Country