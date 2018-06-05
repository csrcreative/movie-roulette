import React, { Component } from "react";

class ThumbUpBtn extends Component {
    constructor(props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
    }


    componentWillMount() {

    }

    //Watch for state changes
    componentDidUpdate() {}

    clickHandler() {
        this.props.thumbUpClick(true);
    }
    render() {
        return <button onClick={this.clickHandler} className="thumbUpBtn">Thumb Up</button>;
    }
}

export default ThumbUpBtn;