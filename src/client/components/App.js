import React, { Component } from "react";
import TopBarRegion from "./topBarRegion";
import RandomMovie from "./randomMovie";
import ThumbUpRegion from "./thumbUpRegion";
import WantToSeeRegion from "./wantToSeeRegion";

class MovieApp extends Component {
    constructor() {
        super();

        this.state = {
            movie: false,
            thumbUpMovies: [],
            wantToSeeMovies: [],
            ratedMovies: [],
            thumbUpClick: false,
            wantToSeeClick: false,
            nextMovieClick: false
        };

        this.getMovie = this.getMovie.bind(this);
        this.thumbUp = this.thumbUp.bind(this);
        this.wantToSee = this.wantToSee.bind(this);
        this.nextMovie = this.nextMovie.bind(this);
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

    thumbUp(value) {
        this.setState({ thumbUpClick: true });
    }

    wantToSee() {
        this.setState({ wantToSeeClick: true });
    }

    nextMovie() {
        this.setState({ nextMovieClick: true });
    }

    componentWillMount() {
        this.getMovie();
        //create method to check for existence of a generated url id
        //if id exists, fetch /api/lists/:listkey
    }

    //Watch for state changes
    componentDidUpdate() {
        if (this.state.thumbUpClick) {
            let data = {
                "movieid": this.state.movie.id,
                "title": this.state.movie.title,
                "image": this.state.movie.poster_path
            }

            this.setState(prevState => ({
                thumbUpMovies: [...prevState.thumbUpMovies, data],
                ratedMovies: [...prevState.ratedMovies, this.state.movie.id],
                thumbUpClick: false
              }));
            
            this.getMovie();
        }
        if (this.state.wantToSeeClick) {
            let data = {
                "movieid": this.state.movie.id,
                "title": this.state.movie.title,
                "image": this.state.movie.poster_path
            }

            this.setState(prevState => ({
                wantToSeeMovies: [...prevState.wantToSeeMovies, data],
                ratedMovies: [...prevState.ratedMovies, this.state.movie.id],
                wantToSeeClick: false
              }));

            this.getMovie();
        }
        if (this.state.nextMovieClick) {
            this.setState(prevState => ({
                ratedMovies: [...prevState.ratedMovies, this.state.movie.id],
                nextMovieClick: false
              }));

            this.getMovie();
        }
    }

    render() {
        return (
            <div className="movie-roulette">
                <TopBarRegion />
                <RandomMovie
                    movie={this.state.movie}
                    thumbUpClick={this.thumbUp}
                    wantToSeeClick={this.wantToSee}
                    nextMovieClick={this.nextMovie}
                />
                <ThumbUpRegion movies={this.state.thumbUpMovies}/>
                <WantToSeeRegion movies={this.state.wantToSeeMovies}/>
            </div>
        );
    }
}

export default MovieApp;
