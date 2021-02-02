
import React from 'react';
import { AddCity, SwitchLastCity } from "../redux/actions/actionCity"
import location_pointer from "../img/location-pointer.svg"
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import city from "./cityData"

const API_KEY = "86ddf541ce3b439e9e6103929213101"

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: '',
      error: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchCity = this.searchCity.bind(this);
  }

  async addNewCity(city) {
    let arrayNameCity = localStorage.getItem("cityName").split(",");
    let newArray = this.props.info.cityArray;
    const numberLastIndex = 4;
    if (this.props.info.cityArray.length === 5) {
      arrayNameCity.pop();
      arrayNameCity.push(city);
      localStorage.setItem("cityName", arrayNameCity)
      localStorage.setItem('lastCurrentCity', numberLastIndex)
      await this.getDataWeather(city).then(info => {
        this.props.SwitchLastCity(newArray, numberLastIndex)
        newArray.splice(newArray.length - 1, 1, info.data)
      })
    } else {
      arrayNameCity.push(city)
      localStorage.setItem("cityName", arrayNameCity)
      localStorage.setItem('lastCurrentCity', newArray.length)
      await this.getDataWeather(city).then(info => this.props.AddCity(info.data, newArray.length))
    }
  }

  async getDataWeather(city) {
    const url = `http://api.worldweatheronline.com/premium/v1/weather.ashx?q=${city}&num_of_days=1&key=${API_KEY}&format=json`;
    return fetch(url)
      .then((res) => res.json());
  }

  handleChange(event) {
    this.setState({ valueInput: event.target.value });
    event.preventDefault();
  }
  searchCity(event) {
    this.addNewCity(this.state.valueInput);
    event.preventDefault();
  }

  render() {
    return (
      <div className="search">
        <div className="search-input" >
          <Autocomplete
            freeSolo
            id="SearchInput"
            disableClearable
            options={city.map((option) => option.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Поиск города"
                margin="normal"
                InputProps={{ ...params.InputProps, type: 'search' }}
                onSelect={this.handleChange}
              />
            )}
          />
        </div>
        <div className="search-btn">
          <img alt="текст" src={location_pointer} onClick={this.searchCity}></img>
        </div>

      </div>
    );
  }
}

export default connect(state => ({
  info: state.cityInfo,
}), { AddCity, SwitchLastCity })(SearchInput);

