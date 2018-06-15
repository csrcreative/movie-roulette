import React, { Component } from "react";
import SaveButton from "./saveButton";

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
            <div className="topBar">
                {this.state.showButton ? (
                    <SaveButton saveClick={this.props.saveClick} />
                ) : null}
                {/* Make the url region into a component */}
                {this.state.url}
            </div>
        );
    }
}

export default TopBar;
