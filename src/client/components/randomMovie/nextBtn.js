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
        return <button className="NextBtn" onClick={this.clickHandler}>Next</button>;
    }
}

export default NextBtn;