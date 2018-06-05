import React, { Component } from "react";
import MoviePoster from "../moviePoster";

class WantToSeeRegion extends Component {
    constructor() {
        super();


    }

    componentWillMount() {

    }

    //Watch for state changes
    componentDidUpdate() {}

    render() {
        return (
            <div className="wantToSeeRegion">
                {this.props.movies.map(i => {
                    return (
                        <MoviePoster key={i.movieid} title={i.title} movieid={i.movieid} image={i.poster_path} />
                    );
                })}
            </div>
        );
    }
}

export default WantToSeeRegion;