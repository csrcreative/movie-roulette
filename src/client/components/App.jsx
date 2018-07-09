import React, { Component } from "react";
import TopBarRegion from "./topBarRegion/index.jsx";
import RandomMovie from "./randomMovie/index.jsx";
import ThumbUpRegion from "./thumbUpRegion/index.jsx";
import WantToSeeRegion from "./wantToSeeRegion/index.jsx";
import Modal from "react-modal";
import ModalContent from "./topBarRegion/modalContent.jsx";

const lodash = require("lodash");
const Hashids = require("hashids");
const hashids = new Hashids();

Modal.setAppElement("#root");

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
            saveUrl: false,
            deleteThumbUpClick: false,
            deleteWantToSeeClick: false,
            deleteId: false,
            listKey: false,
            listId: false,
            listRetrieved: false,
            showModal: false,
            modalRequest: false
        };

        this.getMovie = this.getMovie.bind(this);
        this.thumbUp = this.thumbUp.bind(this);
        this.wantToSee = this.wantToSee.bind(this);
        this.nextMovie = this.nextMovie.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true});
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    getMovie(listId = false) {
        fetch(`/api/movie/${listId}`)
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

    delete(o) {
        this.setState(prevState => {
            let state = {};

            state["deleteId"] = prevState[o.deleteType][o.index].movieid;
            state[o.clickType] = true;
            prevState[o.deleteType].splice(o.index, 1);
            state[o.deleteType] = prevState[o.deleteType];

            return state;
        });
    }
    componentWillMount() {
        //TODO: test this to make sure it only fires when on /list/:userid
        let id = window.location.href.substr(
            window.location.href.lastIndexOf("/") + 1
        );

        if (id.length > 0) {
            fetch(`/proxy/list/${id}`)
                .then(res => res.json())
                .then(data => {
                    this.setState(
                        prevState => ({
                            thumbUpMovies: [...data.ThumbUp],
                            wantToSeeMovies: [...data.WantToSee],
                            listId: data.id,
                            listKey: id,
                            listRetrieved: true
                        }),
                        () => {
                            this.getMovie(this.state.listId);
                        }
                    );
                });
        } else {
            this.getMovie();
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
                    ratedMovies: [...prevState.ratedMovies, data.movieid],
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

            this.setState(
                prevState => ({
                    ratedMovies: setArray(prevState, this.state.movie.id),
                    nextMovieClick: false
                }),
                () => {
                    if (this.state.listRetrieved) {
                        this.getMovie(this.state.listId);
                    } else {
                        this.getMovie();
                    }
                }
            );
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
                saveUrl: `${window.location.href}list/${hash}`,
                listKey: hash,
                modalRequest: true
            });
        }
        if (this.state.deleteThumbUpClick && this.state.listRetrieved) {
            fetch("/proxy/delete/:movieid", {
                method: "POST",
                body: JSON.stringify({
                    movieid: this.state.deleteId,
                    listId: this.state.listId,
                    type: "thumbup"
                }),
                headers: {
                    "content-type": "application/json"
                }
            })
                .then(() => this.setState({ deleteThumbUpClick: false }))
                .catch(error => console.log(error));
        }
        if (this.state.deleteWantToSeeClick && this.state.listRetrieved) {
            fetch("/proxy/delete/:movieid", {
                method: "POST",
                body: JSON.stringify({
                    movieid: this.state.deleteId,
                    listId: this.state.listId,
                    type: "wanttosee"
                }),
                headers: {
                    "content-type": "application/json"
                }
            })
                .then(() => this.setState({ deleteWantToSeeClick: false }))
                .catch(error => console.log(error));
        }
        if (this.state.listKey && this.state.modalRequest && this.state.listRetrieved === false) {
            this.handleOpenModal();

            this.setState({modalRequest: false});
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
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.handleCloseModal}
                    shouldCloseOnOverlayClick={true}
                    className="bg-white mw7 mt4 ml-auto mr-auto br2 pa3 relative"
                    overlayClassName="ModalWindow fixed w-100 h-100 top-0"
                >
                    <ModalContent
                        saveUrl={this.state.saveUrl}
                        handleCloseModal={this.handleCloseModal}
                    />
                </Modal>
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
                {this.state.thumbUpMovies.length > 0 && (
                    <ThumbUpRegion
                        movies={this.state.thumbUpMovies}
                        deleteProps={{
                            delete: this.delete,
                            deleteType: "thumbUpMovies",
                            clickType: "deleteThumbUpClick"
                        }}
                    />
                )}

                {this.state.wantToSeeMovies.length > 0 && (
                    <WantToSeeRegion
                        movies={this.state.wantToSeeMovies}
                        deleteProps={{
                            delete: this.delete,
                            deleteType: "wantToSeeMovies",
                            clickType: "deleteWantToSeeClick"
                        }}
                    />
                )}
            </div>
        );
    }
}

export default MovieApp;
