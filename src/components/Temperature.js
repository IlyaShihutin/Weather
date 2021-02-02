import React from 'react';

import { connect } from "react-redux";
class Temperature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        let currentSelectNumberCity = this.props.info.currentSelectNumberCity;
        let currentConditionData = this.props.info.cityArray[currentSelectNumberCity].current_condition[0];
        let currentTemperatureC = currentConditionData.temp_C;
        let currentTemperatureF = currentConditionData.temp_F;
        let currentweatherIconUrl = currentConditionData.weatherDesc[0].value;
        return (
            <section className="temperature">
                <div className="temperature-info-block">

                    <div className="temperature-block">
                        <p>
                            {currentTemperatureC} C<span>/ {currentTemperatureF} F</span>
                        </p>
                    </div>
                    <div className="temperature-icon">
                        <p>{currentweatherIconUrl}</p>
                    </div>
                </div>
            </section>
        );
    }
}
export default connect(state => ({
    info: state.cityInfo,
}))(Temperature);