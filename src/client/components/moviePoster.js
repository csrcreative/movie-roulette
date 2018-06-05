import React, { Component } from "react";
//TODO: ADD REMOVE BUTTON AND FUNCTION
class MoviePoster extends Component {
    constructor() {
        super();
    }

    componentWillMount() {}

    //Watch for state changes
    componentDidUpdate() {}

    render() {
        return (
            <div className="moviePoster">
                {this.props.title}
            </div>
        );
    }
}

export default MoviePoster;