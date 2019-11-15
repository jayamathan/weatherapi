import React, { Component } from "react";
import axios from "axios";
import ToggleDisplay from "react-toggle-display";

//const URL = `http://api.openweathermap.org/data/2.5/group?units=Imperial&id=1264527,1273865,1264521,1259425,1254361,7603116,1272013,1257629,1253286&appid=d465261d95b43bff6d44b34c18712ba6`;

class Weather extends Component {
  state = {
    weather: [],
    temp_max: [],
    temp_min: [],
    pressure: [],
    clouds: [],
    show: false
  };

  handleClick(id) {
    this.setState({
      show: !this.state.show
    });
  }
  componentDidMount() {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/group?units=Imperial&id=1264527,1273865,1264521,1259425,1254361,7603116,1272013,1257629,1253286&appid=d465261d95b43bff6d44b34c18712ba6`
      )
      .then(response => {
        // const weatherData = response.data;
        console.log(response.data);
        this.setState({
          weather: response.data.list
        });
      });
  }

  render() {
    const { weather } = this.state;

    for (var i = 0; i < weather.length; i++) {
      var list = weather[i];

      console.log(
        list.id,
        list.name,
        list.weather[0].description,
        list.main.temp_max,
        list.main.temp_min,
        list.main.pressure
      );
    }

    return (
      <div>
        weather
        {weather.map(list => (
          <div onClick={() => this.handleClick(list.id)}>
            key={list.id}
            City: {list.name}
            Weather: {list.weather[0].description}
            <ToggleDisplay show={this.state.show}>
              Maximum: {list.main.temp_max}
              Minimum: {list.main.temp_min}
              Pressure: {list.main.pressure}
            </ToggleDisplay>
          </div>
        ))}
      </div>
    );
  }
}
export default Weather;
