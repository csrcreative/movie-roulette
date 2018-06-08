

import React, { Component } from "react";
import TopBarRegion from "./topBarRegion";
import RandomMovie from "./randomMovie";
import ThumbUpRegion from "./thumbUpRegion";
import WantToSeeRegion from "./wantToSeeRegion";

const Hashids = require('hashids');
const hashids = new Hashids();

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
            nextMovieClick: false,
            saveClick: false
        };

        this.getMovie = this.getMovie.bind(this);
        this.thumbUp = this.thumbUp.bind(this);
        this.wantToSee = this.wantToSee.bind(this);
        this.nextMovie = this.nextMovie.bind(this);
        this.save = this.save.bind(this);
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

    //TODO: DISABLE ON CLICK, UNTIL nextMovie click
    thumbUp(value) {
        this.setState({ thumbUpClick: true });
    }
    //TODO: DISABLE ON CLICK, UNTIL nextMovie click
    wantToSee() {
        this.setState({ wantToSeeClick: true });
    }

    nextMovie() {
        this.setState({ nextMovieClick: true });
    }

    save() {
        this.setState({ saveClick: true });
    }

    componentWillMount() {
        this.getMovie();

        let id = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);

        if(id.length > 0) {
            fetch(`/proxy/list/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });
        }
    }

    //Watch for state changes
    //TODO: FIX DUPLICATED RATED ID BUG
    componentDidUpdate() {
        if (this.state.thumbUpClick) {
            let data = {
                "movieid": this.state.movie.id,
                "title": this.state.movie.title,
                "image": this.state.movie.poster_path
            }

            /* 
                 run a disable button function
                    disableButton() {
                        disable: true
                    }
            */

            this.setState(prevState => ({
                thumbUpMovies: [...prevState.thumbUpMovies, data],
                ratedMovies: [...prevState.ratedMovies, this.state.movie.id],
                thumbUpClick: false
              }));
        }
        if (this.state.wantToSeeClick) {
            let data = {
                "movieid": this.state.movie.id,
                "title": this.state.movie.title,
                "image": this.state.movie.poster_path
            }
            /* 
                run a disable button function
                    disableButton() {
                        disable: true
                    }
            */
            this.setState(prevState => ({
                wantToSeeMovies: [...prevState.wantToSeeMovies, data],
                ratedMovies: [...prevState.ratedMovies, this.state.movie.id],
                wantToSeeClick: false
              }));
        }
        if (this.state.nextMovieClick) {

            /* 
            /* 
                 run an ENABLE button function
                    enableButton() {
                        disable: false
                    }
            */
            
            //make sure we aren't adding duplicate ids
            function setArray(prevState, currentState) {
                if (prevState.ratedMovies.includes(currentState)){
                    return [...prevState.ratedMovies];
                }

                return [...prevState.ratedMovies, currentState]
            }

            this.setState(prevState => ({
                ratedMovies: setArray(prevState, this.state.movie.id),
                nextMovieClick: false
              }));

            this.getMovie();
        }
        if (this.state.saveClick) {
            let hash = hashids.encode(Date.now());

            let data = JSON.stringify({
                listkey: hash,
                thumbup: this.state.thumbUpMovies ? this.state.thumbUpMovies : false,
                wanttosee: this.state.wantToSeeMovies ? this.state.wantToSeeMovies : false,
                rated: this.state.ratedMovies ? this.state.ratedMovies : false
            });

            fetch("/proxy/list", {
                method: "POST",
                body: data,
                headers: {
                    "content-type": "application/json"
                }
            });

            this.setState(prevState => ({
                saveClick: false
              }));
        }
    }

    render() {
        return (
            <div className="movie-roulette">
                <TopBarRegion saveClick={this.save}/>
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
