import React, { Component } from "react";
import DeleteButton from "./deleteButton";

//TODO: ADD REMOVE BUTTON AND FUNCTION
class MoviePoster extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    //Watch for state changes
    componentDidUpdate() {}

    render() {
        return (
            <div className="moviePoster mr4">
                <div>
                <img src={`https://image.tmdb.org/t/p/w185/${this.props.image}`} />
                </div>

                <DeleteButton
                    deleteProps={this.props.deleteProps}        
                    index={this.props.index}
                />
            </div>
        );
    }
}

export default MoviePoster;
