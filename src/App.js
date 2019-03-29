import React, { Component } from 'react'
import axios from 'axios'
import { 
  InputGroup,
  Input,
  InputGroupAddon,
  Button
} from 'reactstrap'

import {
  Wrapper,
  CentralContent,
  Header
} from './AppStyles'

import ErrorMessage from './components/ErrorMessage/index'
import WeatherDisplay from './components/WeatherDisplay/index'

const API_KEY = '74ce23a32ea2f9d2ce24d6b82e263594'
const ENDPOINT = `http://api.openweathermap.org/data/2.5/forecast?APPID=${API_KEY}`

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locationValue: '',
      countryValue: '',
      weatherData: false,
      failedSearch: false
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleClick = async () => {
    const {
      locationValue,
      countryValue
    } = this.state
    
    let searchQuery = locationValue

    if (countryValue) {
      searchQuery += `,${countryValue}`
    }

    try {
      // try searching by city
      let weatherResponse = await axios.get(`${ENDPOINT}&q=${searchQuery}`)
      this.setState({
        weatherData: weatherResponse.data,
        failedSearch: false
      });
    } catch (e) {
      // try searching by zip code
      try {
        let weatherResponse = await axios.get(`${ENDPOINT}&zip=${searchQuery}`)
        this.setState({
          weatherData: weatherResponse.data,
          failedSearch: false
        });
      } catch (e) {
        this.setState({
          weatherData: false,
          failedSearch: true
        });
      }
    }
  }

  render() {
    const {
      locationValue,
      countryValue,
      weatherData,
      failedSearch
    } = this.state
    
    return (
      <Wrapper>
        <CentralContent>
          <Header>
            Current Weather In...
          </Header>
          <InputGroup
            size="lg"
          >
            <Input 
              placeholder='Enter city or zip code'
              value={locationValue}
              name='locationValue'
              onChange= {this.handleChange}
            />
            <Input 
              placeholder='Enter country (optional)'
              value={countryValue}
              name='countryValue'
              onChange={this.handleChange}
            />
            <InputGroupAddon 
              addonType="append"
            >
              <Button
                onClick={this.handleClick}
              >
                Search
              </Button>
            </InputGroupAddon>
          </InputGroup>
          { failedSearch ? <ErrorMessage /> : <div/> }
          { weatherData ? <WeatherDisplay data={weatherData} /> : <div/> }
        </CentralContent>
      </Wrapper>
    )
  }
}

export default App;
