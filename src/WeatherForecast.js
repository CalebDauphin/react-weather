import React, { useState, useEffect } from "react"
import "./WeatherForecast.css"
import axios from "axios"
import WeatherForecastDay from "./WeatherForecastDay"

export default function WeatherForecast(props) {
	let [loaded, setLoaded] = useState(false)
	let [forecastData, setForecastData] = useState(null)

	useEffect(() => {
		setLoaded(false)
	}, [props.coordinates])

	function handleResponse(response) {
		setForecastData(response.data.daily)
		setLoaded(true)
	}

	if (loaded) {
		return (
			<div className='WeatherForecast'>
				<div className='row'>
					{forecastData.map(function (dailyForecast, index) {
						if (index < 6) {
							return (
								<div className='col' key={index}>
									<WeatherForecastDay data={dailyForecast} />
								</div>
							)
						} else {
							return null
						}
					})}
				</div>
			</div>
		)
	} else {
		let apiKey = "f4d989e0a37469e143375a913c800d40"
		let longitude = props.coordinates.lon
		let latitude = props.coordinates.lat
		let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`

		axios.get(apiUrl).then(handleResponse)
		return null
	}
}
