import React, { Component } from "react";
import ThumbUpBtn from "./thumbUpBtn.jsx";
import WantToSeeBtn from "./wantToSeeBtn.jsx";
import NextBtn from "./nextBtn.jsx";

class RandomMovie extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    //Watch for state changes//
    componentDidUpdate() {}

    render() {
        return (
            <div className="randomMovie flex justify-center pv4">
                <div>
                    <div className="relative">
                        <img
                            src={`https://image.tmdb.org/t/p/w342/${
                                this.props.movie.poster_path
                            }`}
                        />

                                            <NextBtn
                            nextMovieClick={this.props.nextMovieClick}
                            thumbUpEnable={this.props.thumbUpEnable}
                        />
                    </div>

                    <div className="flex">
                        
                        <ThumbUpBtn
                            thumbUpClick={this.props.thumbUpClick}
                            nextMovieState={this.props.nextMovieState}
                            buttonState={this.props.buttonState}
                        />
                        <WantToSeeBtn
                            wantToSeeClick={this.props.wantToSeeClick}
                            nextMovieState={this.props.nextMovieState}
                            buttonState={this.props.buttonState}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default RandomMovie;
