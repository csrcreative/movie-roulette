import React, { Component } from "react";
import MoviePoster from "../moviePoster";

class WantToSeeRegion extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    //Watch for state changes
    componentDidUpdate() {}

    render() {
        return (
            <div className="wantToSeeRegion tc pa4 bg-moon-gray">
                <h2>Want to See</h2>
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

export default WantToSeeRegion;
