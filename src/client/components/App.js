import React, { Component } from "react";
import TopBarRegion from "./topBarRegion";
import RandomMovie from "./randomMovie";
import ThumbUpRegion from "./thumbUpRegion";
import WantToSeeRegion from "./wantToSeeRegion";

const Hashids = require("hashids");
const hashids = new Hashids();
//TODO: ADD ENVIRONMENTAL VARS FOR URLS
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
            saveClick: false,
            listKey: false,
            listId: false,
            listRetrieved: false
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

    thumbUp(value) {
        this.setState({ thumbUpClick: true });
    }

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
        //TODO: test this to make sure it only fires when on /list/:userid
        let id = window.location.href.substr(
            window.location.href.lastIndexOf("/") + 1
        );

        if (id.length > 0) {
            fetch(`/proxy/list/${id}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        thumbUpMovies: [...data.ThumbUp],
                        wantToSeeMovies: [...data.WantToSee],
                        listId: data.id,
                        listKey: id,
                        listRetrieved: true
                    });
                });
        }
    }

    //Watch for state changes
    componentDidUpdate() {
        //if listRetrieved === true
        //make a fetch POST request on thumbup
        if (this.state.thumbUpClick) {
            let data = {
                movieid: this.state.movie.id,
                title: this.state.movie.title,
                image: this.state.movie.poster_path
            };

            //TODO: REFACTOR TO NOT DO A BATCH WHEN IN LIST RETREIVED MODE
            this.setState(
                prevState => ({
                    thumbUpMovies: [...prevState.thumbUpMovies, data],
                    ratedMovies: [...prevState.ratedMovies, data.movieid],
                    thumbUpClick: false
                }),
                () => {
                    if (this.state.listRetrieved) {
                        fetch(`/proxy/list/${this.state.listKey}`, {
                            method: "POST",
                            body: JSON.stringify({
                                listId: this.state.listId,
                                thumbup: data,
                                rated: data.movieid
                            }),
                            headers: {
                                "content-type": "application/json"
                            }
                        });
                    }
                }
            );
        }
        //if listRetrieved === true
        //make a fetch POST request on wantosee
        if (this.state.wantToSeeClick) {
            let data = {
                movieid: this.state.movie.id,
                title: this.state.movie.title,
                image: this.state.movie.poster_path
            };

            this.setState(
                prevState => ({
                    wantToSeeMovies: [...prevState.wantToSeeMovies, data],
                    ratedMovies: [
                        ...prevState.ratedMovies,
                        data.movieid
                    ],
                    wantToSeeClick: false
                }),

                () => {
                    if (this.state.listRetrieved) {
                        fetch(`/proxy/list/${this.state.listKey}`, {
                            method: "POST",
                            body: JSON.stringify({
                                listId: this.state.listId,
                                wanttosee: data,
                                rated: data.movieid
                            }),
                            headers: {
                                "content-type": "application/json"
                            }
                        });
                    }
                }
            );
        }
        //if listRetrieved === true
        //make a fetch POST request on next
        if (this.state.nextMovieClick) {
            //make sure we aren't adding duplicate ids
            function setArray(prevState, currentState) {
                if (prevState.ratedMovies.includes(currentState)) {
                    return [...prevState.ratedMovies];
                }

                return [...prevState.ratedMovies, currentState];
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
                thumbup: this.state.thumbUpMovies
                    ? this.state.thumbUpMovies
                    : false,
                wanttosee: this.state.wantToSeeMovies
                    ? this.state.wantToSeeMovies
                    : false,
                rated: this.state.ratedMovies ? this.state.ratedMovies : false
            });

            fetch("/proxy/list", {
                method: "POST",
                body: data,
                headers: {
                    "content-type": "application/json"
                }
            });

            this.setState({
                saveClick: false,
                listKey: hash
            });
        }
    }

    render() {
        const buttonState = {
            thumbUp: this.state.thumbUpClick,
            wantToSee: this.state.wantToSeeClick,
            nextMovie: this.state.nextMovieClick
        };

        return (
            <div className="movie-roulette">
                <TopBarRegion
                    saveClick={this.save}
                    listRetrieved={this.state.listRetrieved}
                    listKey={this.state.listKey}
                    buttonState={buttonState}
                />
                <RandomMovie
                    movie={this.state.movie}
                    thumbUpClick={this.thumbUp}
                    buttonState={buttonState}
                    wantToSeeClick={this.wantToSee}
                    nextMovieState={this.state.nextMovieClick}
                    nextMovieClick={this.nextMovie}
                />
                <ThumbUpRegion movies={this.state.thumbUpMovies} />
                <WantToSeeRegion movies={this.state.wantToSeeMovies} />
            </div>
        );
    }
}

export default MovieApp;
