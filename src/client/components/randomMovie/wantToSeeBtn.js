import React, { Component } from "react";

class WantToSeeBtn extends Component {
    constructor(props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
    }


    componentWillMount() {

    }

    //Watch for state changes
    componentDidUpdate() {}

    clickHandler() {
        this.props.wantToSeeClick(true);
    }

    render() {
        return <button className="wantToSeeBtn" onClick={this.clickHandler}>Want to See</button>;
    }
}

export default WantToSeeBtn;