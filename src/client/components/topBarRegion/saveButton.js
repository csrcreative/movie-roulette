import React, { Component } from "react";

class SaveButton extends Component {
    constructor() {
        super();

        this.state = {
            saved: false,
            disabled: false
        }
        this.clickHandler = this.clickHandler.bind(this);
    }

    componentWillMount() {}

    clickHandler() {
        this.props.saveClick(true);
        this.setState({saved: true, disabled: true});
    }
    //Watch for state changes
    componentDidUpdate() {}

    render() {
        return (
            <button className="saveButton" onClick={this.clickHandler} disabled={this.state.disabled}>
                {
                    this.state.saved ?
                    'Saved' : 'Save'
                }
            </button>
        );
    }
}

export default SaveButton;
