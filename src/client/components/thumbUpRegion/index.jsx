import React, { Component } from "react";
import MoviePoster from "../moviePoster.jsx";

class ThumbUpRegion extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    //Watch for state changes
    componentDidUpdate() {}

    render() {
        return (
            <div className="thumbUpRegion tc pa4 bg-light-gray">
                <h2>Thumbed Up</h2>
                <div className="grid mw96">
                    {this.props.movies.map((i, index) => {
                        return (
                            <MoviePoster
                                deleteProps={this.props.deleteProps}
                                index={index}
                                key={i.movieid}
                                title={i.title}
                                movieid={i.movieid}
                                image={i.image}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default ThumbUpRegion;
