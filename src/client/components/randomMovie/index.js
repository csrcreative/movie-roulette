import React, { Component } from "react";
import ThumbUpBtn from "./thumbUpBtn";
import WantToSeeBtn from "./wantToSeeBtn";
import NextBtn from "./nextBtn";

class RandomMovie extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    //Watch for state changes
    componentDidUpdate() {}

    render() {
        return (
            <div className="randomMovie">
                <div>{this.props.movie.title}</div>
                <div>
                    <ThumbUpBtn thumbUpClick={this.props.thumbUpClick} />
                    <WantToSeeBtn wantToSeeClick={this.props.wantToSeeClick}/>
                    <NextBtn nextMovieClick={this.props.nextMovieClick} />
                </div>
            </div>
        );
    }
}

export default RandomMovie;
