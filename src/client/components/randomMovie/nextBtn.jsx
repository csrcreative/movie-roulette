import React, { Component } from "react";

class NextBtn extends Component {
    constructor() {
        super();

        this.clickHandler = this.clickHandler.bind(this);
    }


    componentWillMount() {

    }

    //Watch for state changes
    componentDidUpdate() {}

    clickHandler() {
        this.props.nextMovieClick(true);
    }

    render() {
        return (
            <div className="absolute absolute-center-v right--5">
                <button className="nextBtn br-100 bg-black white w3 h3" onClick={this.clickHandler}>
                    <div className="show-for-sr">Next</div>
                </button>
            </div>
        );
    }
}

export default NextBtn;