import React, { Component } from "react";
import SaveButton from "./saveButton.jsx";

class TopBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: false,
            showButton: false
        };
    }

    componentWillMount() {}

    //Watch for state changes
    componentDidUpdate() {}

    componentWillReceiveProps(props, state) {
        if (props.listKey && props.listRetrieved === false) {
            this.setState({
                url: `${window.location.href}list/${props.listKey}`
            });
        }

        if (
            (props.buttonState.thumbUp || props.buttonState.wantToSee) &&
            props.listRetrieved === false
        ) {
            this.setState({ showButton: true });
        }

    }

    render() {
        return (
            <div className="topBar pl4 pr4 bb bw3">
                <h1 className="ultra lh-solid f1">Movie<br/>Roulette</h1>
                {this.state.showButton ? (
                    <SaveButton saveClick={this.props.saveClick} />
                ) : null}
            </div>
        );
    }
}

export default TopBar;
