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
                <button className="nextBtn pa3 ba bw2 b--black" onClick={this.clickHandler}>
                    Next
                </button>
            </div>
        );
    }
}

export default NextBtn;