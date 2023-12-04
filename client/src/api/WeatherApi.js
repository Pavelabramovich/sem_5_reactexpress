import React, { Component } from "react";

const API_KEY = "91d45fb3f775b8f850579a41205a2a39";

class MyWeatherComponent extends Component {
  state = {
    weatherData: ""
  };

  componentDidMount() {
    this.fetchWeatherData();
  }

  fetchWeatherData = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_KEY}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          weatherData: data
        });
      });
  };

  getTemp() {
    let tempC;
    try {
        const tempK =  this.state.weatherData.main.temp
        tempC = Math.round(tempK - 273.15);

        return `In ${this.state.weatherData.name} now ${tempC} ℃`
    } catch(e) {
        return ""
    }
  }

  render() {
    return (
      <div>
        {this.getTemp()}
      </div>
    );
  }
}

export default MyWeatherComponent;