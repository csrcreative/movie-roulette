import React, { Component } from "react";

class WantToSeeBtn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: false
        };

        this.clickHandler = this.clickHandler.bind(this);
    }

    componentWillMount() {}

    //Watch for state changes
    componentDidUpdate() {}

    componentWillReceiveProps(props, state) {
        if (this.props.nextMovieState) {
            this.setState({ disabled: false });
        }
        if(this.props.buttonState.thumbUp) {
            this.setState({disabled:true});
        }

    }

    clickHandler() {
        this.props.wantToSeeClick(true);
        this.setState({disabled:true});
    }

    render() {
        return (
            <button
                className="wantToSeeBtn w-50 pt2 pb2 ba bw2 b--black"
                onClick={this.clickHandler}
                disabled={this.state.disabled}
            >
                Add to Watchlist
            </button>
        );
    }
}

export default WantToSeeBtn;
