
import React from 'react';
import './css/app.css';

import Temperature from "./components/Temperature";
import Header from "./components/Header";
import Weather from "./components/Weather";
import FavoriteLocation from "./components/FavoriteLocation";
import LoadingWindow from "./components/LoadingWindow";
import { addAllCity } from "./redux/actions/actionCity";

import { connect } from "react-redux";
const API_KEY = "86ddf541ce3b439e9e6103929213101";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  async checkArrayCity() {
    if (localStorage.getItem("cityName") == null) {
      localStorage.setItem('lastCurrentCity', 0);
      await this.getStartCity().then(cityName => localStorage.setItem("cityName", cityName.city));
    }
    const arrayNameCity = localStorage.getItem("cityName").split(",");
    return arrayNameCity;
  }

  getFullDataWeather(arrayNameCity) {
    const result = [];
    for (let i = 0; i < arrayNameCity.length; i++) {
      const city = arrayNameCity[i];
      const promise = this.getWeather(city).then((details) => ({ ...details }));
      result.push(promise);
    }
    return Promise.all(result);
  }

  addFullArrayData(array) {
    this.props.addAllCity(array, Number(localStorage.getItem('lastCurrentCity')));
  }

  getStartCity() {
    const url = `https://ipinfo.io/json?token=2fb6a0656d6ab6`;
    return fetch(url)
      .then((res) => res.json());
  }

  getWeather(city) {
    const url = `http://api.worldweatheronline.com/premium/v1/weather.ashx?q=${city}&num_of_days=1&key=${API_KEY}&format=json`;
    return fetch(url)
      .then((res) => res.json())
      .then((array) => array.data);
  }

  async checkErrorData(array) {
    let index1;
    array = array.filter((item, index) => {
      if (item.error !== undefined) {
        index1 = index;
      }
      return item.error === undefined;
    })
    if (array.length === 0) {
      const defaultCity = "Минск";
      await this.getWeather(defaultCity)
        .then(newData => array.push(newData));
      localStorage.setItem('lastCurrentCity', 0);
      localStorage.setItem("cityName", defaultCity);
    }
    else {
      const allNamyCity = localStorage.getItem("cityName").split(",");
      const newNameCity = allNamyCity.filter((item, index) => index !== index1);
      if (localStorage.getItem('lastCurrentCity') === index1) {
        localStorage.setItem('lastCurrentCity', 0);
      }
      localStorage.setItem("cityName", newNameCity);
    }
    return array
  }

  componentDidMount() {
    this.checkArrayCity()
      .then(arrayNameCity => this.getFullDataWeather(arrayNameCity))
      .then(array => this.checkErrorData(array))
      .then((array) => this.addFullArrayData(array));
  }

  render() {
    if (this.props.info.cityArray[0] === undefined || this.state.loading) {
      return (<div className="App">
        <div className="background"></div>
        <LoadingWindow />
      </div>);
    } else {
      return (
        <div className="App">
          <div className="wrapper">
            <Header />
            <Temperature />
            <Weather />
            <FavoriteLocation />
          </div>
        </div>
      );
    }

  }
}
export default connect(state => ({
  info: state.cityInfo,
}), { addAllCity })(App);