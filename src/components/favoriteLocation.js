import React from 'react';
import basket from "../img/trash.svg"
import { deleteCurCity, chooseSelectCity } from "../redux/actions/actionCity"

import { connect } from "react-redux";
class FavoriteLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.deleteCity = this.deleteCity.bind(this);
        this.chooseCity = this.chooseCity.bind(this);
    }

    deleteCity(deleteIndex) {
        let currentNumber = this.props.info.currentSelectNumberCity;
        let fullArray = this.props.info.cityArray;
        fullArray = fullArray.filter((item, index) => index !== deleteIndex);
        if (currentNumber === (this.props.info.cityArray.length - 1) || deleteIndex < currentNumber) {
            currentNumber -= 1;
        }
        let arrayNameCity = localStorage.getItem("cityName").split(",");
        arrayNameCity = arrayNameCity.filter((item, index) => index !== deleteIndex);
        localStorage.setItem("cityName", arrayNameCity);
        localStorage.setItem('lastCurrentCity', currentNumber);
        this.props.deleteCurCity(fullArray, currentNumber);
    }

    chooseCity(event, index) {
        if (event.target.localName !== "img") {
            localStorage.setItem('lastCurrentCity', index);
            this.props.chooseSelectCity(index);
        }
    }

    render() {
        const currentConditionData = this.props.info.cityArray;

        return (
            <div className="favorite-location">
                <div className="city-block">
                    {currentConditionData.map((el, index) => {
                        if (this.props.info.cityArray.length === 1) {
                            return <div className="city-panel" key={index} ><div className="city-name">{el.request[0].query}</div></div>
                        } else {
                            return <div className={"city-panel"} key={index} onClick={(event) => this.chooseCity(event, index)}>
                                <div className="city-name">{el.request[0].query}</div>
                                <img alt="basket" src={basket}
                                    onMouseOver={event => event.target.parentNode.style.background = "rgba(255, 0, 0, 0.3)"}
                                    onMouseOut={event => event.target.parentNode.style.background = ""}
                                    onClick={(event) => this.deleteCity(index)}></img>
                            </div>
                        }
                    }
                    )}
                </div>
            </div>
        );
    }
}
export default connect(state => ({
    info: state.cityInfo,
}), { deleteCurCity, chooseSelectCity })(FavoriteLocation);