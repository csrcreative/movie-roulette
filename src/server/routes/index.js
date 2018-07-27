require("dotenv").load(); //loading .env variables
const server_url = process.env.PRODUCTION_URL || "http://localhost:8000";
const expressAccessToken = require("express-access-token");
const accessToken = [process.env.API_TOKEN];
const fetch = require("node-fetch");

const listsCtrl = require("../controllers").lists;
const thumbCtrl = require("../controllers").thumbup;
const rateCtrl = require("../controllers").rated;
const wantCtrl = require("../controllers").wanttosee;
const getMovie = require("../external_apis/moviedb").getMovie;

const Hashids = require("hashids");
const hashids = new Hashids();
//TODO: ADD ERROR LOGGING FOR FETCHES
//TODOL: RESOLVE DISCREPANCY BTW listid VS listId. ITS CREATING PROBLEMS.
//TODO: USE CONSISTENT VAR NAMES

const firewall = (req, res, next) => {
    const authorized = accessToken.includes(req.accessToken);
    if (!authorized) return res.status(403).send("Forbidden");
    next();
};

module.exports = app => {
    app.get("/api", (req, res) =>
        res.status(200).send({
            message: "Welcome to the Movies Roulette API!"
        })
    );

    //get a random movie. this route can accept an optional list id.
    app.get("/api/movie/:listId?", expressAccessToken, firewall, getMovie);

    //get all lists
    app.get("/api/lists", expressAccessToken, firewall, listsCtrl.list);

    //create a list
    app.post("/api/lists/", expressAccessToken, firewall, listsCtrl.create);

    //get list by listkey (timestamp)
    app.get(
        "/api/lists/:listkey",
        expressAccessToken,
        firewall,
        listsCtrl.retrieve
    );

    //delete a list
    //app.delete('/api/lists/', listsCtrl.destroy);

    //add a rated movie
    app.post(
        "/api/lists/:listId/rated",
        expressAccessToken,
        firewall,
        rateCtrl.create
    );

    //get a rated movie
    app.get(
        "/api/lists/:listId/rated/:movieid",
        expressAccessToken,
        firewall,
        rateCtrl.retrieve
    );

    //delete a rated
    app.delete(
        "/api/lists/:listid/rated/:movieid",
        expressAccessToken,
        firewall,
        rateCtrl.destroy
    );

    //add a thumb up movie
    app.post(
        "/api/lists/:listid/thumbup",
        expressAccessToken,
        firewall,
        thumbCtrl.create
    );

    //delete a thumb up movie
    app.delete(
        "/api/lists/:listid/thumbup/:movieid",
        expressAccessToken,
        firewall,
        thumbCtrl.destroy
    );

    //add a want to see movie
    app.post(
        "/api/lists/:listid/wanttosee",
        expressAccessToken,
        firewall,
        wantCtrl.create
    );

    //delete a want to see movie
    app.delete(
        "/api/lists/:listid/wanttosee/:movieid",
        expressAccessToken,
        firewall,
        wantCtrl.destroy
    );

    //Defining proxies here
    app.get(
        "/proxy/movie/:listkey?",
        (req, res) => {
            console.log(req.user);
            const id = hashids.decode(req.params.listkey) ? hashids.decode(req.params.listkey) : "";

            return fetch(`${server_url}/api/movie/${id}?accessToken=${accessToken[0]}`, {
                method: "GET"
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    return res.status(201).send(data);
                })
                .catch(error => console.log("this is the error: " + error));
        }
    );

    app.get(
        "/proxy/list/:listkey",
        (req, res) => {
            const id = hashids.decode(req.params.listkey);

            return fetch(`${server_url}/api/lists/${id}?accessToken=${accessToken[0]}`, {
                method: "GET"
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    return res.status(201).send(data);
                })
                .catch(error => console.log("this is the error: " + error));
        }
    );

    app.post("/proxy/list/", (req, res) => {
        const key = hashids.decode(req.body.listkey);
        const data = JSON.stringify({
            listkey: key[0]
        });

        fetch(`${server_url}/api/lists?accessToken=${accessToken[0]}`, {
            method: "POST",
            body: data,
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (req.body.thumbup.length > 0) {
                    let arr = [];

                    req.body.thumbup.map(e => {
                        arr.push({
                            movieid: e.movieid,
                            title: e.title,
                            image: e.image,
                            listId: data.id
                        });
                    });

                    fetch(`${server_url}/api/lists/${data.id}/thumbup?accessToken=${accessToken[0]}`, {
                        method: "POST",
                        body: JSON.stringify(arr),
                        headers: {
                            "content-type": "application/json"
                        }
                    });
                }

                if (req.body.wanttosee.length > 0) {
                    let arr = [];

                    req.body.wanttosee.map(e => {
                        arr.push({
                            movieid: e.movieid,
                            title: e.title,
                            image: e.image,
                            listId: data.id
                        });
                    });

                    fetch(`${server_url}/api/lists/${data.id}/wanttosee?accessToken=${accessToken[0]}`, {
                        method: "POST",
                        body: JSON.stringify(arr),
                        headers: {
                            "content-type": "application/json"
                        }
                    });
                }

                if (req.body.rated) {
                    let arr = [];

                    req.body.rated.map(e => {
                        arr.push({
                            movieid: e,
                            listId: data.id
                        });
                    });

                    fetch(`${server_url}/api/lists/${data.id}/rated?accessToken=${accessToken[0]}`, {
                        method: "POST",
                        body: JSON.stringify(arr),
                        headers: {
                            "content-type": "application/json"
                        }
                    });
                }

                return res.status(201).send(data);
            });
    });

    //TODO: ADD A VARIABLE TO THE PROXY URLS FOR THUMBUP VS WANTTOSEE
    app.post(
        "/proxy/list/:listkey",
        (req, res) => {
            const id = hashids.decode(req.params.listkey);
            const type = req.body.thumbup || req.body.wanttosee;

            let data = {
                movieid: type.movieid,
                title: type.title,
                image: type.image,
                listId: req.body.listId
            };

            if (req.body.thumbup) {
                fetch(`${server_url}/api/lists/${data.listId}/thumbup?accessToken=${accessToken[0]}`, {
                    method: "POST",
                    body: JSON.stringify([data]),
                    headers: {
                        "content-type": "application/json"
                    }
                }).catch(error => res.status(400).send(error));
            }

            if (req.body.wanttosee) {
                fetch(`${server_url}/api/lists/${data.listId}/wanttosee?accessToken=${accessToken[0]}`, {
                    method: "POST",
                    body: JSON.stringify([data]),
                    headers: {
                        "content-type": "application/json"
                    }
                }).catch(error => res.status(400).send(error));
            }

            if (req.body.rated) {
                fetch(`${server_url}/api/lists/${data.listId}/rated?accessToken=${accessToken[0]}`, {
                    method: "POST",
                    body: JSON.stringify({
                        movieid: data.movieid,
                        listId: data.listId
                    }),
                    headers: {
                        "content-type": "application/json"
                    }
                }).catch(error => res.status(400).send(error));
            }
            return res.status(201).send(data);
        }
    );

    app.post(
        "/proxy/delete/:movieid",
        (req, res) => {
            let data = {
                movieid: req.body.movieid,
                listId: req.body.listId
            };

            fetch(
                `${server_url}/api/lists/${data.listId}/${req.body.type}/${
                    data.movieid
                }?accessToken=${accessToken[0]}`,
                {
                    method: "DELETE",
                    body: JSON.stringify(data)
                }
            )
                .then(() => {
                    ///api/lists/:listid/rated/:movieid
                    fetch(
                        `${server_url}/api/lists/${data.listId}/rated/${
                            data.movieid
                        }?accessToken=${accessToken[0]}`,
                        {
                            method: "DELETE",
                            body: JSON.stringify(data),
                            headers: {
                                "content-type": "application/json"
                            }
                        }
                    );
                })
                .then(data => {
                    return res.status(201).send(data);
                })
                .catch(error => res.status(400).send(error));
        }
    );
};
