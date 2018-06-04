import React, { Component } from "react";
import TopBar from "./topBar";
import RandomMovie from "./randomMovie";
import ThumbUp from "./thumbUp";
import WantToSee from "./wantToSee";

class MovieApp extends Component {
    constructor() {
        super();

        this.state = {
            movie: false
        };

        this.getMovie = this.getMovie.bind(this);
    }

    getMovie() {
        fetch("/api/movie")
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ movie: data });
            });
    }
    componentWillMount() {
        this.getMovie();
        //create method to check for existence of a generated url id
        //if id exists, fetch /api/lists/:listkey
    }

    //Watch for state changes
    componentDidUpdate() {}

    render() {
        return( 
        <div className="movie-roulette">
            <TopBar />
            <RandomMovie />
            <ThumbUp />
            <WantToSee />
        </div>);
    }
}

export default MovieApp;
