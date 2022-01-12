import React from 'react';

import { connect } from "react-redux";
class Temperature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const currentSelectNumberCity = this.props.info.currentSelectNumberCity;
        const currentConditionData = this.props.info.cityArray[currentSelectNumberCity].current_condition[0];
        const currentTemperatureC = currentConditionData.temp_C;
        const currentTemperatureF = currentConditionData.temp_F;
        const currentweatherIconUrl = currentConditionData.weatherDesc[0].value;
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