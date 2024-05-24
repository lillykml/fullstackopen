import { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({capital}) => {

    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`)
        .then(response => {
            setWeather(response.data)
        })
    }, [])

    if (weather) {
        return (
            <>
                <h1>Weather in {capital}</h1>
                <p>temperature {(weather.main.temp-273.15).toFixed(2)} celsius</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
                <p>wind {weather.wind.speed}m/s</p>
            </>
        )
    } else return null
    
}

export default Weather