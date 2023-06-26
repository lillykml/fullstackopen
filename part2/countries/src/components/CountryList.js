import Country from "./Country"

const CountryList = ({countries, showHandler}) => {
    if(countries.length === 0) {
        return (<p>No country matches this filter</p>)
    }
    else if (countries.length > 10) {
        return (<p>Too many matches, specify another filter</p>)
    } else if (countries.length === 1){
        return <Country country={countries[0]}/>
    } else {
        return (<>{countries.map(c => <>
        <p key={Number(c.ccn3)}>{c.name.common}</p>
        <button onClick={() => showHandler(c)}>Show</button>
        </>)}</>)
    }
}

export default CountryList;