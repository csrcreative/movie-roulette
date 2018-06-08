const fetch = require("node-fetch");

const listsCtrl = require("../controllers").lists;
const thumbCtrl = require("../controllers").thumbup;
const rateCtrl = require("../controllers").rated;
const wantCtrl = require("../controllers").wanttosee;
const getMovie = require("../external_apis/moviedb").getMovie;

const Hashids = require("hashids");
const hashids = new Hashids();

module.exports = app => {
    app.get("/api", (req, res) =>
        res.status(200).send({
            message: "Welcome to the Todos API!"
        })
    );

    //get a random movie
    app.get("/api/movie", getMovie);

    //get all lists
    app.get("/api/lists", listsCtrl.list);

    //create a list
    app.post("/api/lists/", listsCtrl.create);

    //get list by listkey (timestamp)
    app.get("/api/lists/:listkey", listsCtrl.retrieve);

    //delete a list
    //app.delete('/api/lists/', listsCtrl.destroy);

    //add a rated movie
    app.post("/api/lists/:listid/rated", rateCtrl.create);

    //get a rated movie
    //app.post('/api/lists/:listid/rated/:movieid', rateCtrl.retrieve);

    //delete a rated
    app.delete("/api/lists/:listid/rated/:movieid", rateCtrl.destroy);

    //add a thumb up movie
    app.post("/api/lists/:listid/thumbup", thumbCtrl.create);

    //delete a thumb up movie
    app.delete("/api/lists/:listid/thumbup/:movieid", thumbCtrl.destroy);

    //add a want to see movie
    app.post("/api/lists/:listid/wanttosee", wantCtrl.create);

    //delete a want to see movie
    app.delete("/api/lists/:listid/wanttosee/:movieid", wantCtrl.destroy);

    //Defining proxies here
    app.post("/proxy/list/", (req, res) => {
        console.log(req.body.listkey);
        const key = hashids.decode(req.body.listkey);
        const data = JSON.stringify({
            listkey: key[0]
        });

        //fix this url
        fetch("http://localhost:8000/api/lists", {
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
                if (req.body.thumbup) {

                    let arr = [];

                    req.body.thumbup.map(e => {
                        arr.push({
                            movieid: e.movieid,
                            title: e.title,
                            image: e.image,
                            listId: data.id
                        });
                    });

                    fetch(`http://localhost:8000/api/lists/${data.id}/thumbup`, {
                        method: "POST",
                        body: JSON.stringify(arr),
                        headers: {
                            "content-type": "application/json"
                        }
                    });
                }

                if (req.body.wanttosee) {
                    let arr = [];

                    req.body.wanttosee.map(e => {
                        arr.push({
                            movieid: e.movieid,
                            title: e.title,
                            image: e.image,
                            listId: data.id
                        });
                    });

                    fetch(`http://localhost:8000/api/lists/${data.id}/wanttosee`, {
                        method: "POST",
                        body: JSON.stringify(arr),
                        headers: {
                            "content-type": "application/json"
                        }
                    });
                }
               
                if(req.body.rated) {
                    let arr = [];

                    req.body.rated.map(e => {
                        arr.push({
                            movieid: e,
                            listId: data.id
                        });
                    });

                    fetch(`http://localhost:8000/api/lists/${data.id}/rated`, {
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

    app.get("/proxy/list/:listkey", (req, res) => {
        const id = hashids.decode(req.params.listkey);

        return fetch(`http://localhost:8000/api/lists/${id}`, {
            method: "GET"
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                return res.status(201).send(data);
            })
            .catch(error => console.log("this is the error: " + error));
    });
};
