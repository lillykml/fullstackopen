const Results = ({countries}) => {
    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else {
        return (
            <ul>
                {countries.map(country => <li key={country}>{country}</li>)}
            </ul>
        )
    }
}

export default Results