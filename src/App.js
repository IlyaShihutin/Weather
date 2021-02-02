
import React from 'react';
import './css/app.css';

import Temperature from "./components/Temperature"
import Header from "./components/Header"
import Weather from "./components/Weather"
import FavoriteLocation from "./components/favoriteLocation"
import LoadingWindow from "./components/LoadingWindow"
import { AddCity, DeleteCity, ChooseCity } from "./redux/actions/actionCity"

import { connect } from "react-redux";
const API_KEY = "86ddf541ce3b439e9e6103929213101"

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading:true
    };
    this.startLoading=this.startLoading.bind(this)
  }
 startLoading() {
  this.setState({
    loading: false,
})
  }

  async checkArrayCity() {
    if (localStorage.getItem("cityName") == null || localStorage.getItem('lastCurrentCity') == null) {
      localStorage.setItem('lastCurrentCity', 0)
      await this.getStartCity().then(cityName => localStorage.setItem("cityName", cityName.city));
    }
    const arrayNameCity = localStorage.getItem("cityName").split(",");

  for (let i = 0; i < arrayNameCity.length; i++) {
      await this.AddDataWeather(arrayNameCity[i], i)
    }
    let prevNumberCity = Number(localStorage.getItem('lastCurrentCity'))
    this.props.ChooseCity(prevNumberCity)

  }

  async getStartCity() {
    const url = `https://ipinfo.io/json?token=2fb6a0656d6ab6`;
    return fetch(url)
      .then((res) => res.json())
  }

  async AddDataWeather(city, count) {
    await this.getWeather(city).then(info => this.props.AddCity(info.data, count))
  }

  async getWeather(city) {
    const url = `http://api.worldweatheronline.com/premium/v1/weather.ashx?q=${city}&num_of_days=1&key=${API_KEY}&format=json`;
    return fetch(url)
      .then((res) => res.json());
  }

  componentDidMount() {
    this.checkArrayCity()
    setTimeout(this.startLoading,1000); 
  }

  render() {
    if (this.props.info.cityArray[0] === undefined ||  this.state.loading) {
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
}), { AddCity, DeleteCity, ChooseCity })(App);