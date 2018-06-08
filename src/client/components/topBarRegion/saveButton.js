import React, { Component } from "react";

class SaveButton extends Component {
    constructor() {
        super();

        this.clickHandler = this.clickHandler.bind(this);
    }

    componentWillMount() {

    }

    clickHandler() {
        this.props.saveClick(true);
    }
    //Watch for state changes
    componentDidUpdate() {}

    render() {
        return <button className="saveButton" onClick={this.clickHandler}>Save</button>;
    }
}

export default SaveButton;