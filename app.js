require("es6-promise").polyfill();
require("fetch-everywhere");

import dotenv from "dotenv"; //loading .env variables
dotenv.load();

import compression from "compression";
import express from "express";
import expstate from "express-state";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";

import React from "react";
import { renderToString } from "react-dom/server";
import MovieApp from "./src/client/components/App";

const app = express();
const apiToken = [process.env.API_TOKEN];
const server_url = process.env.PRODUCTION_URL || "http://localhost:8000";

expstate.extend(app);

app.set("state namespace", "MovieRoulette");
app.use(compression());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./src/views"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/build/"));

// Require our routes into the application.
require("./src/server/routes")(app);

function _loadMovie(req, res) {
    return fetch(`${server_url}/proxy/movie/`)
        .then(response => response.json())
        .then(json => {
            return json;
        });
}

function _loadList(req, res) {
    return fetch(`${server_url}/proxy/list/${req.params.listid}`)
        .then(response => response.json())
        .then(json => {
            return json;
        });
}

app.get("/", (req, res) => {
    const data = {};
    const movie = _loadMovie(req, res);

    movie.then((movie) => {
        data.movie = movie;
        data.list = false;
        
        const initialState = data;
        const jsx = <MovieApp {...initialState} />;
        const reactDom = renderToString(jsx);
        res.expose(initialState, "MovieRoulette.initialState");
        res.render("index", {
            react: reactDom,
            initialState: { initialState },
            production: process.env.PRODUCTION === "true" ? true : false
        });
    });

});

app.get("/list/:listid", (req, res) => {
    let data = {};
    const movie = _loadMovie(req, res);

    movie.then((movie) => {
        data.movie = movie;

        const list = _loadList(req, res);

        list.then((list) => {
            data.list = list;

            const initialState = data;
            const jsx = <MovieApp {...initialState} />;
            const reactDom = renderToString(jsx);
            res.expose(initialState, "MovieRoulette.initialState");
            res.render("index", {
                react: reactDom,
                initialState: { initialState },
                production: process.env.PRODUCTION === "true" ? true : false
            });

        })
    });
});

module.exports = app;
