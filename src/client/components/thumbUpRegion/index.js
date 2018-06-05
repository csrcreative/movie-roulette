import React, { Component } from "react";
import MoviePoster from "../moviePoster";

class ThumbUpRegion extends Component {
    constructor() {
        super();
    }

    componentWillMount() {}

    //Watch for state changes
    componentDidUpdate() {}

    render() {
        return (
            <div className="thumbUpRegion">
                {this.props.movies.map(i => {
                    return (
                        <MoviePoster key={i.movieid} title={i.title} movieid={i.movieid} image={i.poster_path} />
                    );
                })}
            </div>
        );
    }
}

export default ThumbUpRegion;
