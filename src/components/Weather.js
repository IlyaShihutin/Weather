import React from 'react';
import humidity from '../img/humidity.svg'
import pressure from '../img/pressure_white_fill.svg'
import wind_white from '../img/wind_white.svg'
import feels_like from '../img/feels_like_white.svg'
import { connect } from "react-redux";

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let currentSelectNumberCity = this.props.info.currentSelectNumberCity;
        let currentConditionData = this.props.info.cityArray[currentSelectNumberCity].current_condition[0];
        let currentWind = Math.round(currentConditionData.windspeedKmph / 3);
        let currentHumidity = currentConditionData.humidity;
        let currentPressure = currentConditionData.pressure;
        let currentFeelsLikeC = currentConditionData.FeelsLikeC;
        return (
            <section className="weather">
                <div className="weather-info">
                    <div className="felt weather-block">
                        <img alt="felt " src={feels_like}></img>
                        <p>Ощущается как</p>
                        <div className="felt-info">
                            {currentFeelsLikeC} C
                            </div>
                    </div>
                    <div className="wind weather-block">
                        <img alt="wind" src={wind_white}></img>
                        <div>Ветер</div>
                        <div>{currentWind}м/с</div>
                    </div>
                    <div className="humidity weather-block">
                        <img alt="humidity" src={humidity}></img>
                        <div>Влажность</div>
                        <div>{currentHumidity}%</div>
                    </div>
                    <div className="pressure weather-block">
                        <img alt="pressure" src={pressure}></img>
                        <div>Давление</div>
                        <div>{currentPressure}гПа</div>
                    </div>
                </div>
            </section>
        );
    }
}
export default connect(state => ({
    info: state.cityInfo,
}))(Weather);