import React, { Component } from "react";
import DeleteButton from "./deleteButton";

//TODO: ADD REMOVE BUTTON AND FUNCTION//
class MoviePoster extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    //Watch for state changes
    componentDidUpdate() {}

    render() {
        return (
            <div className="moviePoster pa2 bg-white">
            
                <div className="moviePoster-img">
                <img src={`https://image.tmdb.org/t/p/w185/${this.props.image}`} />
                </div>
                <div className="pt2">
                    <div>{this.props.title}</div>
                    <DeleteButton
                        deleteProps={this.props.deleteProps}        
                        index={this.props.index}
                />
                </div>
            </div>
        );
    }
}

export default MoviePoster;
