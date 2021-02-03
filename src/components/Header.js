import React from 'react';
import { connect } from "react-redux";
import SearchInput from "./SearchInput";
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: "",
        };
    }
    addTime() {
        let today = new Date();
        const time = new Date().toLocaleTimeString().slice(0, -3);
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = dd + '.' + mm + '.' + yyyy + " " + time;
        this.setState({
            time: today,
        })
    }
    componentDidMount() {
        this.addTime()
    }
    render() {
        const currentSelectNumberCity = this.props.info.currentSelectNumberCity;
        const currentCity = this.props.info.cityArray[currentSelectNumberCity].request[0].query;

        return (
            <section className="header">
                <div className="header-block">
                    <div className="header-block-city">
                        {currentCity}
                    </div>
                    <div className="header-block-search">
                        <SearchInput />
                    </div>
                    <div className="header-block-time">
                        Сегодня {this.state.time}
                    </div>
                </div>
            </section>
        );
    }
}

export default connect(state => ({
    info: state.cityInfo
}))(Header);