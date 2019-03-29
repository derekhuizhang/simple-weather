import React from 'react'

import {	WeatherDisplayWrapper } from './styles'

const WeatherDisplay = ({ data }) => {
	const {
		main,
		weather,
		wind
	} = data['list'][0]

	const locationText = `${data['city']['name']}, ${data['city']['country']}`
	
	const fahrenheitText = `${Math.round((main['temp'] - 273.15) * 1.8 + 32)} F`

	const descriptionText = `Description: ${weather[0]['description']}`

	const smallerDetailsText = `Humidity: ${main['humidity']}% | Wind Speed: ${wind['speed']} m/s`

	return (
		<WeatherDisplayWrapper>
			<h1>
				{locationText}
			</h1>
			<h1 style={{ fontSize: '64px' }}>
				{fahrenheitText}
			</h1>
			<h2> 
				{weather[0]['main']} 
			</h2>
			<h6 style={{ fontStyle: 'italic' }}>
				{descriptionText}
			</h6>
			<p>
				{smallerDetailsText}
			</p>
		</WeatherDisplayWrapper>
	);
}

export default WeatherDisplay