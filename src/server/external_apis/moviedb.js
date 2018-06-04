require("dotenv").load(); //loading .env variables
const fetch = require("node-fetch");
const movieApiToken = process.env.MOVIEDB_URL;
const movieApiUrl = "https://api.themoviedb.org/3/discover/movie";

module.exports = {
    //TODO: ADD A CONDITION TO CHECK IF A MOVIE EXISTS IN THE LIST DB, IF LIST EXISTS
    getMovie(req, res) {
        const page = Math.floor(Math.random() * (1000 - 0 + 1) + 0);

        const obj = {
            api_key: movieApiToken,
            region: "US",
            release_type: 3,
            without_genres: "99,10402,10770,10751",
            movie_type: "movie",
            certification_country: "US",
            include_video: false,
            include_adult: false,
            page: page
        };

        const params = Object.entries(obj)
            .map(e => e.join("="))
            .join("&");

        return fetch(`${movieApiUrl}?${params}`, {
            method: "GET"
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                let index = Math.floor(Math.random() * data.results.length);
                return res.status(201).send(data.results[index]);
            })
            .catch(error => console.log("this is the error: " + error));
    }
};
